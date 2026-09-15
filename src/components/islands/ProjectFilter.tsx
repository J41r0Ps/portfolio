import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * ProjectFilter — the first React island in this codebase.
 *
 * ─────────────────────────────────────────────────────────────────────
 * WHAT THIS COMPONENT DOES NOT DO: render projects.
 *
 * Every project card is static HTML, written by Astro at build time.
 * This island renders the filter controls and toggles the visibility of
 * cards it does not own. That is deliberate: if the cards lived in React
 * state, they would vanish from the HTML and the whole catalogue would
 * become invisible to crawlers and ATS parsers — exactly the failure the
 * previous portfolio had.
 *
 * So: React owns the controls. Astro owns the content. The island
 * touches the content only through data attributes.
 * ─────────────────────────────────────────────────────────────────────
 *
 * Strings arrive as props because `t()` runs at build time and does not
 * exist in the browser.
 */

export interface Facet {
  /** The raw value stored in the card's data attribute. */
  value: string;
  /** Translated text shown to the user. Often identical to `value`. */
  label: string;
  count: number;
}

interface Props {
  categories: Facet[];
  topics: Facet[];
  tech: Facet[];
  labels: {
    category: string;
    topics: string;
    tech: string;
    clear: string;
    resultsOne: string;
    resultsOther: string;
  };
}

type Group = "category" | "topics" | "tech";

/** Which data attribute on the card holds each group's values. */
const ATTRIBUTE: Record<Group, string> = {
  category: "data-category",
  topics: "data-topics",
  tech: "data-tech",
};

export default function ProjectFilter({ categories, topics, tech, labels }: Props) {
  const [selected, setSelected] = useState<Record<Group, string[]>>({
    category: [],
    topics: [],
    tech: [],
  });

  const [matchCount, setMatchCount] = useState<number | null>(null);

  const hasFilters = useMemo(
    () => Object.values(selected).some((values) => values.length > 0),
    [selected],
  );

  /* ------------------------------------------------------------------
     Read the URL once on mount.

     This is what makes "/projects?tech=React" a shareable link, gives
     the back button something to restore, and survives a refresh.
     Filter state that lives only in useState is invisible and
     unshareable.
     ------------------------------------------------------------------ */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setSelected({
      category: params.getAll("category"),
      topics: params.getAll("topic"),
      tech: params.getAll("tech"),
    });
  }, []);

  /* ------------------------------------------------------------------
     Apply the filter to the DOM, and mirror the state into the URL.

     Runs on every selection change. The work is proportional to the
     number of cards, which is small — no memoisation needed, and adding
     it would be premature.
     ------------------------------------------------------------------ */
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("[data-project]");
    let visible = 0;

    for (const card of cards) {
      /**
       * Within a group the test is OR (React *or* Astro).
       * Across groups it is AND (a data-science project *and* one
       * using Python). That is what people expect from faceted search,
       * and getting it backwards makes the filter feel broken without
       * anyone being able to say why.
       */
      const matches = (Object.keys(ATTRIBUTE) as Group[]).every((group) => {
        const wanted = selected[group];
        if (wanted.length === 0) return true;

        const raw = card.getAttribute(ATTRIBUTE[group]) ?? "";
        const values = raw.split("|");

        return wanted.some((value) => values.includes(value));
      });

      /**
       * Hide the list item, not the article — otherwise the grid keeps
       * the empty cell and leaves gaps.
       */
      const container = card.closest("li") ?? card;
      container.classList.toggle("hidden", !matches);

      if (matches) visible += 1;
    }

    setMatchCount(visible);

    const empty = document.querySelector<HTMLElement>("[data-empty-state]");
    if (empty) empty.hidden = visible > 0;

    // replaceState rather than pushState: every chip click becoming a
    // history entry would make the back button useless.
    const params = new URLSearchParams();
    selected.category.forEach((value) => params.append("category", value));
    selected.topics.forEach((value) => params.append("topic", value));
    selected.tech.forEach((value) => params.append("tech", value));

    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      query ? `${window.location.pathname}?${query}` : window.location.pathname,
    );
  }, [selected]);

  const toggle = useCallback((group: Group, value: string) => {
    setSelected((current) => {
      const values = current[group];

      return {
        ...current,
        [group]: values.includes(value)
          ? values.filter((entry) => entry !== value)
          : [...values, value],
      };
    });
  }, []);

  const clear = useCallback(() => {
    setSelected({ category: [], topics: [], tech: [] });
  }, []);

  const renderGroup = (group: Group, heading: string, facets: Facet[]) => (
    <div>
      <h2
        className="font-mono text-xs tracking-widest text-accent uppercase"
        id={`filter-${group}`}
      >
        {heading}
      </h2>

      <ul className="mt-3 flex flex-wrap gap-1.5" aria-labelledby={`filter-${group}`}>
        {facets.map((facet) => {
          const active = selected[group].includes(facet.value);

          return (
            <li key={facet.value}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => toggle(group, facet.value)}
                className={[
                  "inline-flex cursor-pointer items-center gap-1.5 rounded-full border",
                  "px-2.5 py-1 font-mono text-[11px] leading-none whitespace-nowrap",
                  "transition-colors",
                  active
                    ? "border-accent bg-accent text-on-accent"
                    : "border-border text-text-muted hover:border-accent hover:text-accent",
                ].join(" ")}
              >
                {facet.label}
                <span className="opacity-60">{facet.count}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );

  const resultText =
    matchCount === null
      ? ""
      : (matchCount === 1 ? labels.resultsOne : labels.resultsOther).replace(
          "{count}",
          String(matchCount),
        );

  return (
    <div className="space-y-6">
      {renderGroup("category", labels.category, categories)}
      {renderGroup("topics", labels.topics, topics)}
      {renderGroup("tech", labels.tech, tech)}

      <div className="flex flex-wrap items-center gap-4">
        {hasFilters && (
          <button
            type="button"
            onClick={clear}
            className="font-mono text-xs text-text-muted underline
                       underline-offset-4 transition-colors hover:text-accent"
          >
            {labels.clear}
          </button>
        )}

        {/*
          aria-live announces the new count to a screen reader when
          filtering changes it. Sighted users see the grid shrink;
          without this, nobody else is told anything happened.
        */}
        <p aria-live="polite" className="font-mono text-xs text-text-muted">
          {hasFilters ? resultText : ""}
        </p>
      </div>
    </div>
  );
}

# 🌐 Portfolio - Jairo Alessandro

This repository contains my **personal portfolio project** developed
during my 2nd year of **Applied Computer Science at Thomas More**.\
It showcases my skills in **Web Development, Full Stack, Cloud, and
Security**, following a professional workflow with **CI/CD, Docker, and
Azure**.

---

## 🚀 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Backend**: Python (FastAPI, SQLAlchemy, Pydantic)
- **Database**: PostgreSQL (Neon)
- **Testing**: pytest
- **Cloud & CI/CD**: Docker, GitHub Actions, Azure Container Apps

---

## 📂 Project Structure

    portfolio/
    frontend/ → Static website (Bootstrap, JS)
    backend/ → REST API (FastAPI + Postgres)
    docker/ → Containerization setup
    .github/ → CI/CD pipelines

---

## ⚡ Features

- Responsive landing page with Bootstrap
- REST API with CRUD operations (projects)
- PostgreSQL database hosted on Neon
- Automatic deployment via GitHub Actions
- Secure environment configuration with `.env`

---

## 🛠️ Setup (Local Development)

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

Simply open `frontend/index.html` in your browser.\
To serve it locally:

```bash
cd frontend
python -m http.server 8080
```

### 🐳 Docker

Build and run with Docker Compose:

```bash
docker-compose up --build
```

### 🌍 Deployment

The project is automatically deployed to Azure Container Apps through
GitHub Actions.

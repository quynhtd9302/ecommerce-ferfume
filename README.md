# ecommerce-ferfume

Online perfume store: **Spring Boot 2.3 (Java)** backend + **React 17 / TypeScript** frontend.

## Requirements

- JDK 8+ (tested with JDK 21)
- Node.js 16+ (tested with Node 22)
- PostgreSQL (or Docker)

## Quick start

### 1. Database

```bash
docker compose up -d            # starts PostgreSQL with database "perfume" (user postgres / root)
```

Or create a database named `perfume` in your own PostgreSQL. Tables and sample data are created
automatically by Flyway on first start (`src/main/resources/db/migration`).

### 2. Backend (http://localhost:8080)

```bash
./mvnw spring-boot:run          # Windows: mvnw.cmd spring-boot:run
```

Swagger UI: http://localhost:8080/swagger-ui.html

### 3. Frontend (http://localhost:3000)

```bash
cd frontend
npm install
npm start
```

### Demo accounts

| Role  | Email             | Password |
|-------|-------------------|----------|
| Admin | admin@gmail.com   | admin    |

## Configuration

All settings live in `src/main/resources/application.properties` and can be overridden with environment variables:

| Variable | Default | Description |
|---|---|---|
| `DB_URL` | `jdbc:postgresql://localhost:5432/perfume` | JDBC URL |
| `DB_USERNAME` / `DB_PASSWORD` | `postgres` / `root` | DB credentials |
| `JWT_SECRET` | `change-this-secret-in-production` | JWT signing key — **change in production** |
| `FRONTEND_HOST` | `localhost:3000` | Frontend host (CORS, e-mail links, OAuth2 redirect) |
| `UPLOAD_PATH` | `uploads` | Folder where uploaded perfume images are stored (served at `/img/**`) |
| `SERVER_PUBLIC_URL` | `http://localhost:8080` | Public backend URL used to build image links |
| `MAIL_USERNAME` / `MAIL_PASSWORD` | – | SMTP account (Gmail app password). If mail is not configured, e-mails are skipped and logged |
| `RECAPTCHA_SECRET` | empty | Google reCAPTCHA secret. Empty = captcha verification disabled (development) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | `changeme` | Google OAuth2 login |
| `FACEBOOK_CLIENT_ID` / `FACEBOOK_CLIENT_SECRET` | `changeme` | Facebook OAuth2 login |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | `changeme` | GitHub OAuth2 login |

Frontend (`frontend/.env`):

| Variable | Default | Description |
|---|---|---|
| `REACT_APP_API_URL` | `http://localhost:8080` | Backend URL |
| `REACT_APP_RECAPTCHA_SITE_KEY` | demo key | Google reCAPTCHA site key |

## Tests

```bash
# backend (needs a PostgreSQL database named "perfumetest")
./mvnw test

# frontend
cd frontend
CI=true npm test
```

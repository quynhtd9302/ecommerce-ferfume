# ecommerce-ferfume

Online perfume store: **Spring Boot 2.3 (Java)** backend + **React 17 / TypeScript** frontend.

## Requirements

- JDK 21 (built and run with Temurin 21 in `Dockerfile`/CI; `pom.xml` targets bytecode 1.8)
- Node.js 22 (pinned in `frontend/.nvmrc`, `frontend/Dockerfile` and CI; also verified working on Node 20)
- PostgreSQL (or Docker)

## Run everything with Docker

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8080 (Swagger UI: http://localhost:8080/swagger-ui.html)

Settings such as `JWT_SECRET`, `MAIL_USERNAME`/`MAIL_PASSWORD` or `RECAPTCHA_SECRET` can be put in a `.env` file next to
`docker-compose.yml`. If the site is not served from `localhost`, also set `FRONTEND_HOST` (e.g. `shop.example.com`)
and `BACKEND_PUBLIC_URL` (e.g. `https://api.example.com`, the backend URL as seen from the browser).
Uploaded images are kept in the `uploads` Docker volume.

## Local development

### 1. Database

```bash
docker compose up -d postgres   # PostgreSQL with database "perfume" (user postgres / root)
```

Or create a database named `perfume` in your own PostgreSQL. Tables and sample data are created
automatically by Flyway on first start (`src/main/resources/db/migration`).

### 2. Backend (http://localhost:8080)

```bash
./mvnw spring-boot:run          # Windows: mvnw.cmd spring-boot:run
```

Runs with the `dev` Spring profile by default (see [Configuration](#configuration)). Swagger UI:
http://localhost:8080/swagger-ui.html

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

Backend settings are split by Spring profile under `src/main/resources/`:

| File | Purpose |
|---|---|
| `application.yml` | Settings shared by every environment (file upload, mail, OAuth2, JWT, reCAPTCHA, ...) plus `spring.profiles.active` (defaults to `dev`) |
| `application-dev.yml` | Local development: DB defaults to `localhost:5432/perfume`, `show-sql: true`, verbose logging |
| `application-prod.yml` | Production: DB defaults to `postgres:5432/perfume` (the `postgres` service on the docker-compose network), `show-sql: false`, quieter logging |
| `src/test/resources/application-test.yml` | Used by `@ActiveProfiles("test")` tests: DB `perfumetest`, Flyway disabled, `ddl-auto: create` |

Select the profile with `SPRING_PROFILES_ACTIVE` (`docker-compose.yml` sets it to `prod` for the `backend` service;
`./mvnw spring-boot:run` uses the `dev` default). Every value below can still be overridden with an environment
variable regardless of profile:

| Variable | Default (dev / prod) | Description |
|---|---|---|
| `DB_URL` | `jdbc:postgresql://localhost:5432/perfume` / `jdbc:postgresql://postgres:5432/perfume` | JDBC URL |
| `DB_USERNAME` / `DB_PASSWORD` | `postgres` / `root` | DB credentials |
| `JWT_SECRET` | `change-this-secret-in-production` | JWT signing key — **change in production** |
| `FRONTEND_HOST` | `localhost:3000` | Frontend host (CORS, e-mail links, OAuth2 redirect) |
| `UPLOAD_PATH` | `uploads` | Folder where uploaded perfume images are stored (served at `/img/**`). Only JPG, PNG, GIF and WEBP files are accepted |
| `MAIL_USERNAME` / `MAIL_PASSWORD` | empty | SMTP account (Gmail app password). If mail is not configured, e-mails are skipped and logged |
| `RECAPTCHA_SECRET` | empty | Google reCAPTCHA secret. Empty = captcha verification disabled (development) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | `changeme` | Google OAuth2 login |
| `FACEBOOK_CLIENT_ID` / `FACEBOOK_CLIENT_SECRET` | `changeme` | Facebook OAuth2 login |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | `changeme` | GitHub OAuth2 login |

Frontend (`frontend/.env`):

| Variable | Default | Description |
|---|---|---|
| `REACT_APP_API_URL` | `http://localhost:8080` | Backend URL |
| `REACT_APP_RECAPTCHA_SITE_KEY` | demo key | Google reCAPTCHA site key |
| `REACT_APP_SHOP_NAME` | `Perfume` | Store name (footer) |
| `REACT_APP_SHOP_PHONE` / `REACT_APP_SHOP_EMAIL` | empty | Contact details (footer, Contacts page); hidden when empty |
| `REACT_APP_FACEBOOK_URL` / `REACT_APP_INSTAGRAM_URL` / `REACT_APP_TWITTER_URL` | empty | Social network links in the footer; hidden when empty |

## Images

- Sample perfume images are bundled in `src/main/resources/static/images/perfumes` and served by the backend.
- The home page banners, brand logos and site logo are still loaded from `i.ibb.co`. Copy them into the project if
  you don't want to depend on that host.

## Tests

```bash
# backend (needs a PostgreSQL database named "perfumetest")
./mvnw test

# frontend
cd frontend
CI=true npm test
npx eslint --ext .ts,.tsx src   # CI fails the build on ESLint warnings
```

CI (GitHub Actions, `.github/workflows/ci.yml`) runs the backend tests, the frontend type check / tests / build and
builds the Docker images on every pull request.

# Ganj-e-Inayat Sarkar Website

HTML / CSS / vanilla JavaScript frontend, Python (FastAPI) backend, MySQL 8 database, AI Agent (Day 6).
Full documentation: see the Technical Documentation doc (1-week plan, schema, API, AI design).

## Status: Day 1 complete

- [x] Git repository and folder structure
- [x] MySQL models for all 13 tables + Alembic configuration
- [x] FastAPI base (config, DB session, CORS, `/api/health`, static frontend)
- [x] Design tokens, base styles, components (buttons, cards, header, footer)
- [x] Shared header/footer, mobile menu, Urdu (RTL) / English switch
- [x] Seed script (settings + 5 Khidmaat cards) and admin-creation script

## Local setup

Requirements: Python 3.12, MySQL 8.

```bash
# 1. Database (run in the mysql client as root)
CREATE DATABASE ganj_e_inayat CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'ganj_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON ganj_e_inayat.* TO 'ganj_user'@'localhost';

# 2. Backend
cd backend
python -m venv .venv && source .venv/bin/activate     # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp ../.env.example .env                                # then edit DATABASE_URL and SECRET_KEY

# 3. Create the tables (first time: generate the initial migration, then apply it)
alembic revision --autogenerate -m "initial schema"
alembic upgrade head

# 4. Starter data and an admin login
python -m scripts.seed_initial
python -m scripts.create_admin

# 5. Run
uvicorn app.main:app --reload --port 8000
```

Open http://localhost:8000 (site), http://localhost:8000/design-system.html (design system),
http://localhost:8000/docs (API docs), http://localhost:8000/api/health (health check).
Commit the generated file in `backend/migrations/versions/` so every environment uses the same schema.

## Notes

- `site_settings` uses the column `setting_key` (not `key`) because `key` is a reserved word in MySQL.
- A `silsila.html` page is linked in the menu (as in the approved UI); it is built on Day 3.
- Urdu translations in `frontend/js/i18n.js` and `scripts/seed_initial.py` are drafts and must be approved by the institution.
- `frontend/assets/logo-placeholder.svg` is a placeholder; replace it with the institution's real logo.
- Fonts load from Google Fonts (Cormorant Garamond, Source Sans 3, Noto Nastaliq Urdu).

## Folder structure

```
frontend/   static site (HTML, css/, js/, assets/)
admin/      admin panel (Day 5)
backend/    FastAPI app, models, Alembic migrations, scripts, tests
deploy/     Nginx, Gunicorn, backup (Day 7)
```

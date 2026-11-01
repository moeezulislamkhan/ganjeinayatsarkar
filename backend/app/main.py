"""FastAPI entry point.

Run locally (from the backend/ folder):
    uvicorn app.main:app --reload --port 8000
API docs:  http://localhost:8000/docs
"""
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.routers import public

app = FastAPI(
    title="Ganj-e-Inayat Sarkar API",
    version="0.1.0",
    # Hide interactive docs in production.
    docs_url=None if settings.is_production else "/docs",
    redoc_url=None,
    openapi_url=None if settings.is_production else "/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.include_router(public.router, prefix="/api")

# In development FastAPI also serves the static frontend, so one command runs
# everything. In production Nginx serves these files directly (see deploy/).
FRONTEND_DIR = Path(__file__).resolve().parents[2] / "frontend"
if FRONTEND_DIR.is_dir():
    app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="frontend")

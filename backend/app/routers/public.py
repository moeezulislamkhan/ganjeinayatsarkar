"""Public (no login) endpoints. Content endpoints are added on Day 4."""
from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.db import get_db

router = APIRouter(tags=["public"])


@router.get("/health")
def health(db: Session = Depends(get_db)) -> dict:
    """Liveness + database check, used by deploy scripts and monitoring."""
    try:
        db.execute(text("SELECT 1"))
        db_ok = True
    except SQLAlchemyError:
        db_ok = False
    return {"status": "ok" if db_ok else "degraded", "database": db_ok}

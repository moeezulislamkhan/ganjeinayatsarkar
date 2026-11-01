"""Smoke test: the app starts and /api/health answers.

Needs a reachable DATABASE_URL (or it reports database=false, which is still a 200).
Run from backend/:  pytest
"""
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_endpoint_responds():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] in {"ok", "degraded"}

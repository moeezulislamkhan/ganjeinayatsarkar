"""Application settings, loaded from environment variables / backend/.env."""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_env: str = "development"
    secret_key: str = "change-me"
    database_url: str = (
        "mysql+pymysql://ganj_user:strong_password@localhost:3306/"
        "ganj_e_inayat?charset=utf8mb4"
    )
    cors_origins: str = "http://localhost:8000,http://127.0.0.1:8000"

    # AI Agent (used from Day 6). The key stays in the backend only.
    anthropic_api_key: str = ""
    anthropic_model: str = "claude-sonnet-5-5"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    @property
    def is_production(self) -> bool:
        return self.app_env.lower() == "production"


settings = Settings()

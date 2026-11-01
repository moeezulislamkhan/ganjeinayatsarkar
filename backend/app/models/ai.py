"""AI Agent tables (used from Day 6)."""
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Index, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base
from app.models.mixins import CreatedAtMixin


class AIKnowledge(Base):
    """Chunks of approved site content the AI is allowed to answer from."""

    __tablename__ = "ai_knowledge"
    __table_args__ = (
        Index("ft_ai_knowledge", "title", "content", mysql_prefix="FULLTEXT"),
        Index("ix_ai_knowledge_source", "source_type", "source_id"),
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    source_type: Mapped[str] = mapped_column(String(50))  # news, publication, program, hadith...
    source_id: Mapped[int] = mapped_column()
    lang: Mapped[str] = mapped_column(String(2))  # ur / en
    title: Mapped[str] = mapped_column(String(255))
    content: Mapped[str] = mapped_column(Text)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now(), onupdate=func.now()
    )


class AIConversation(CreatedAtMixin, Base):
    __tablename__ = "ai_conversations"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    session_id: Mapped[str] = mapped_column(String(64), index=True)
    lang: Mapped[str] = mapped_column(String(2))


class AIMessage(CreatedAtMixin, Base):
    __tablename__ = "ai_messages"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    conversation_id: Mapped[int] = mapped_column(
        ForeignKey("ai_conversations.id", ondelete="CASCADE"), index=True
    )
    role: Mapped[str] = mapped_column(String(20))  # user / assistant
    content: Mapped[str] = mapped_column(Text)
    sources_json: Mapped[str | None] = mapped_column(Text)

"""Public website content. Every user-facing text has an _ur and an _en column."""
from datetime import datetime

from sqlalchemy import Boolean, DateTime, Enum, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base
from app.models.mixins import CreatedAtMixin


class SiteSetting(Base):
    """Key/value settings: logo, address, phone, social links, about text...

    The column is called setting_key because `key` is a reserved word in MySQL.
    """

    __tablename__ = "site_settings"

    setting_key: Mapped[str] = mapped_column(String(100), primary_key=True)
    value_ur: Mapped[str | None] = mapped_column(Text)
    value_en: Mapped[str | None] = mapped_column(Text)


class HeroSlide(Base):
    __tablename__ = "hero_slides"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    image: Mapped[str] = mapped_column(String(255))
    title_ur: Mapped[str] = mapped_column(String(255))
    title_en: Mapped[str] = mapped_column(String(255))
    subtitle_ur: Mapped[str | None] = mapped_column(String(500))
    subtitle_en: Mapped[str | None] = mapped_column(String(500))
    cta_label_ur: Mapped[str | None] = mapped_column(String(100))
    cta_label_en: Mapped[str | None] = mapped_column(String(100))
    cta_url: Mapped[str | None] = mapped_column(String(255))
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)


class Khidmat(Base):
    __tablename__ = "khidmaat"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    icon: Mapped[str | None] = mapped_column(String(100))
    title_ur: Mapped[str] = mapped_column(String(255))
    title_en: Mapped[str] = mapped_column(String(255))
    description_ur: Mapped[str | None] = mapped_column(Text)
    description_en: Mapped[str | None] = mapped_column(Text)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)


class Hadith(Base):
    """Only rows with is_verified = True may be shown on the site or used by the AI."""

    __tablename__ = "ahadith"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    arabic_text: Mapped[str] = mapped_column(Text)
    translation_ur: Mapped[str | None] = mapped_column(Text)
    translation_en: Mapped[str | None] = mapped_column(Text)
    narrator: Mapped[str | None] = mapped_column(String(255))
    book_ref: Mapped[str | None] = mapped_column(String(255))
    hadith_number: Mapped[str | None] = mapped_column(String(50))
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


class Publication(Base):
    __tablename__ = "publications"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    type: Mapped[str] = mapped_column(Enum("book", "article", name="publication_type"))
    title_ur: Mapped[str] = mapped_column(String(255))
    title_en: Mapped[str] = mapped_column(String(255))
    author: Mapped[str | None] = mapped_column(String(255))
    cover_image: Mapped[str | None] = mapped_column(String(255))
    file_url: Mapped[str | None] = mapped_column(String(255))
    summary_ur: Mapped[str | None] = mapped_column(Text)
    summary_en: Mapped[str | None] = mapped_column(Text)
    published_at: Mapped[datetime | None] = mapped_column(DateTime)


class News(Base):
    __tablename__ = "news"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title_ur: Mapped[str] = mapped_column(String(255))
    title_en: Mapped[str] = mapped_column(String(255))
    body_ur: Mapped[str | None] = mapped_column(Text)
    body_en: Mapped[str | None] = mapped_column(Text)
    image: Mapped[str | None] = mapped_column(String(255))
    published_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    is_published: Mapped[bool] = mapped_column(Boolean, default=False)


class Program(Base):
    __tablename__ = "programs"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    type: Mapped[str] = mapped_column(Enum("weekly", "monthly", "annual", name="program_type"))
    title_ur: Mapped[str] = mapped_column(String(255))
    title_en: Mapped[str] = mapped_column(String(255))
    schedule_ur: Mapped[str | None] = mapped_column(String(500))
    schedule_en: Mapped[str | None] = mapped_column(String(500))
    venue_ur: Mapped[str | None] = mapped_column(String(500))
    venue_en: Mapped[str | None] = mapped_column(String(500))


class GalleryItem(Base):
    __tablename__ = "gallery_items"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    image: Mapped[str] = mapped_column(String(255))
    caption_ur: Mapped[str | None] = mapped_column(String(500))
    caption_en: Mapped[str | None] = mapped_column(String(500))
    category: Mapped[str | None] = mapped_column(String(100))
    sort_order: Mapped[int] = mapped_column(Integer, default=0)


class ContactMessage(CreatedAtMixin, Base):
    __tablename__ = "contact_messages"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(150))
    email: Mapped[str | None] = mapped_column(String(255))
    phone: Mapped[str | None] = mapped_column(String(50))
    message: Mapped[str] = mapped_column(Text)
    ip: Mapped[str | None] = mapped_column(String(45))  # fits IPv6
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)

"""Import every model here so Alembic sees them on Base.metadata."""
from app.models.admin import AdminUser
from app.models.ai import AIConversation, AIKnowledge, AIMessage
from app.models.content import (
    ContactMessage,
    GalleryItem,
    Hadith,
    HeroSlide,
    Khidmat,
    News,
    Program,
    Publication,
    SiteSetting,
)

__all__ = [
    "AdminUser", "AIConversation", "AIKnowledge", "AIMessage", "ContactMessage",
    "GalleryItem", "Hadith", "HeroSlide", "Khidmat", "News", "Program",
    "Publication", "SiteSetting",
]

"""Insert the starter settings and the five Khidmaat cards.

Run from backend/:   python -m scripts.seed_initial
Safe to run more than once (existing rows are left untouched).

Urdu texts marked DRAFT must be reviewed by the institution before launch.
"""
from sqlalchemy import select

from app.db import SessionLocal
from app.models import Khidmat, SiteSetting

SETTINGS = {
    # key: (value_ur, value_en)
    "site_name": ("حضور گنجِ عنایت سرکار", "Ganj-e-Inayat Sarkar"),
    "site_tagline": ("سلسلۂ نقشبندیہ", "Silsila-e-Naqshbandia"),  # DRAFT (ur)
    "address": (
        "قبرستان بلاک اے تھری گلبرگ تھری، لاہور، پنجاب پاکستان",
        "Qabristan Block A-3, Gulberg III, Lahore, Punjab, Pakistan",
    ),
    "whatsapp": ("+92 333 4328031", "+92 333 4328031"),
    "email": ("ganjeinayatofficial@gmail.com", "ganjeinayatofficial@gmail.com"),
    "opening_hours": (
        "روزانہ صبح 6 بجے سے رات 11 بجے تک",
        "Open daily, 6 am - 11 pm",
    ),
}

KHIDMAAT = [
    # (icon, title_ur [DRAFT], title_en)
    ("book-open", "تعلیم و اسلامی علوم", "Education & Islamic Learning"),
    ("prayer-beads", "روحانی رہنمائی", "Spiritual Guidance"),
    ("users", "سماجی بہبود و خدمتِ خلق", "Social Welfare & Community Service"),
    ("file-text", "تحقیق و اشاعت", "Research & Publications"),
    ("heart-hand", "خدمتِ انسانیت", "Khidmaat for Humanity"),
]


def main() -> None:
    with SessionLocal() as db:
        for key, (ur, en) in SETTINGS.items():
            if db.get(SiteSetting, key) is None:
                db.add(SiteSetting(setting_key=key, value_ur=ur, value_en=en))

        if db.scalar(select(Khidmat.id).limit(1)) is None:
            for order, (icon, ur, en) in enumerate(KHIDMAAT, start=1):
                db.add(Khidmat(icon=icon, title_ur=ur, title_en=en, sort_order=order))

        db.commit()
    print("Seed complete.")


if __name__ == "__main__":
    main()

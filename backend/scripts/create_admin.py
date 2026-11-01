"""Create an admin login.   Run from backend/:  python -m scripts.create_admin"""
from getpass import getpass

from sqlalchemy import select

from app.db import SessionLocal
from app.models import AdminUser
from app.security import hash_password


def main() -> None:
    email = input("Admin email: ").strip().lower()
    password = getpass("Password (min 12 chars): ")
    if len(password) < 12:
        raise SystemExit("Password too short.")
    if password != getpass("Repeat password: "):
        raise SystemExit("Passwords do not match.")

    with SessionLocal() as db:
        if db.scalar(select(AdminUser.id).where(AdminUser.email == email)):
            raise SystemExit("An admin with this email already exists.")
        db.add(AdminUser(email=email, password_hash=hash_password(password), role="admin"))
        db.commit()
    print("Admin created.")


if __name__ == "__main__":
    main()

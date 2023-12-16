from fastapi import Depends
from sqlalchemy.orm import Session
from limehd.models import User
from limehd.utils import generate_fingerprint


def create_user_without_fingerprint(db: Session) -> User:
    fingerprint = generate_fingerprint()
    user = User(
        email=None,
        hashed_password=None,
        fingerprint=fingerprint
    )
    db.add(user)
    db.commit()
    return user


def get_by_user_id(db: Session, fingerprint: str) -> User:
    user = db.query(User).filter(User.fingerprint == fingerprint).first()
    return user


def check_cookie(db: Session, cookie: str) -> User | None:
    user = db.query(User).filter(User.fingerprint == cookie).first()
    if user:
        return user.fingerprint
    return None

from sqlalchemy.orm import Session
from backend.limehd.models import User
from backend.limehd.utils import generate_fingerprint


def create_user_without_fingerprint(db: Session):
    fingerprint = generate_fingerprint()
    user = User(
        email=None,
        hashed_password=None,
        fingerprint=fingerprint
    )
    db.add(user)
    db.commit()
    return user


async def get_by_user_id(db: Session, fingerprint: str):
    user = await db.query(User).filter(User.fingerprint == fingerprint).first()
    if user:
        return fingerprint
    else:
        new_user = create_user_without_fingerprint(db)
        return new_user.fingerprint

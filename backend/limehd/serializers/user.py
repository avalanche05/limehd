from sqlalchemy.orm import Session

from backend.limehd.models import user as db_model_user
from backend.limehd import schemas, serializers


def get_user(db_user: db_model_user.User) -> schemas.User:
    user = schemas.User(
        id=db_user.id,
        email=db_user.email,
        hashed_password=db_user.hashed_password,
        fingerprint=db_user.fingerprint,
        favorite_programs=db_user.programs,
        favorite_channels=db_user.channels
    )

    return user

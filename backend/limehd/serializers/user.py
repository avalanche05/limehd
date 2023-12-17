from sqlalchemy.orm import Session

from limehd.models import user as db_model_user
from limehd import schemas, serializers
import json


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


def serialize_user(db_user: db_model_user.User) -> schemas.User2:
    # print(db_user.id, db_user.email, db_user.fingerprint, db_user.programs, db_user.channels)
    user = schemas.User2(
        id=db_user.id,
        email=db_user.email,
        fingerprint=db_user.fingerprint,
        favorite_programs=[serializers.get_program(program) for program in db_user.programs],
        favorite_channels=[serializers.get_channel(channel, db_user.id) for channel in db_user.channels]
    )
    return user

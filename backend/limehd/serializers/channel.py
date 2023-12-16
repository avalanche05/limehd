from sqlalchemy.orm import Session

from limehd.models import channel as db_model_channel
from limehd import schemas, serializers
from .stream import get_streams


def get_channel(db_channel: db_model_channel.Channel, user_id: int) -> schemas.Channel:
    channel = schemas.Channel(
        id=db_channel.id,
        name=db_channel.name,
        rating=db_channel.rating,
        description=db_channel.description,
        image=db_channel.image,
        is_favorite=any(s.id == user_id for s in db_channel.subscribers),
        stream_link=db_channel.stream_link,
        schedule=get_streams(db_channel.streams)
    )

    return channel


def get_channels(db_channels: list[db_model_channel.Channel], user_id: int) -> list[schemas.Channel]:
    return [get_channel(db_channel, user_id) for db_channel in db_channels]

from sqlalchemy.orm import Session

from backend.limehd.models import channel as db_model_channel
from backend.limehd import schemas, serializers


def get_channel(db: Session, db_channel: db_model_channel) -> schemas.Channel:
    channel = schemas.Channel(
        id=db_channel.id,
        name=db_channel.name,
        rating=db_channel.rating,
        description=db_channel.description,
        image=db_channel.image,
        is_favorite=db_channel.is_favorite,
        stream_link=db_channel.stream_link,
        schedule=db_channel.streams
    )

    return channel

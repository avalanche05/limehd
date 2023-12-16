from typing import List, Type

from sqlalchemy import func, and_
from sqlalchemy.orm import Session
from limehd import models, schemas
from datetime import datetime
from Levenshtein import distance


def get_channel_by_channel_id(db: Session, id: int) -> models.Channel:
    channel = db.query(models.Channel).filter(models.Channel.id == id).first()

    return channel


def levenshtein_search(string1: str, string2: str, threshold: int = 3) -> bool:
    return distance(string1, string2) <= threshold


def get_channels(
        db: Session,
        search_name: str = None,
        start: datetime = None,
        finish: datetime = None,
) -> List[models.Channel]:
    query = db.query(models.Channel)

    if search_name:
        channels = [channel for channel in channels if levenshtein_search(channel.name, search_name)]

    if start and finish:
        channel_ids = (
            db.query(models.Channel.id)
            .join(models.Channel.streams)
            .filter(models.Stream.start >= start, models.Stream.finish <= finish)
            .distinct()
            .all()
        )

        channel_ids = [channel_id for (channel_id,) in channel_ids]

        query = query.filter(models.Channel.id.in_(channel_ids))

    channels = query.all()

    return channels


def add_subscriber_to_channel(db: Session, user_id: int, channel_id: int):
    channel = db.query(models.Channel).filter(models.Channel.id == channel_id).first()
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if channel and user:
        channel.subscribers.append(user)
        db.commit()


def update_channel_rating(
        db: Session,
        channel_id: int,
        mark: int,
):
    channel = db.query(models.Channel).filter(models.Channel.id == channel_id).first()

    if channel:
        channel.votes_count += 1
        channel.rating = ((float(channel.rating) * (channel.votes_count - 1)) + int(mark)) / channel.votes_count

        db.commit()

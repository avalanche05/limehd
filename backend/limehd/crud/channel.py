from typing import List, Type

from sqlalchemy import func, and_
from sqlalchemy.orm import Session
from limehd import models, schemas
from datetime import datetime
from Levenshtein import distance
import pytz


def get_channel_by_channel_id(db: Session, id: int) -> models.Channel:
    channel = db.query(models.Channel).filter(models.Channel.id == id).first()

    return channel


def comparator(item: str, search_name: str, threshold: int = 3) -> list:
    item = item.lower().strip()
    search_name = search_name.lower().strip()
    return [distance(item, search_name), abs(len(item) - len(search_name)), len(item) - len(search_name)]


def get_channels(
        db: Session,
        search_name: str = None,
        start: datetime = None,
        finish: datetime = None,
) -> List[models.Channel]:
    query = db.query(models.Channel)

    channels = query.all()
    if search_name:
        channels = sorted(channels, key=lambda x: comparator(x.name, search_name))
        channels = [channel for channel in channels if
                    distance(channel.name.lower().strip(), search_name.lower().strip()) <= 3]
        if channels and distance(channels[0].name.lower().strip(), search_name.lower().strip()) == 0:
            channels = channels[:1]

    if start and finish:
        desired_timezone = pytz.timezone('Europe/Moscow')
        moscow_datetime = start.astimezone(desired_timezone)
        start = moscow_datetime.replace(tzinfo=None)

        desired_timezone = pytz.timezone('Europe/Moscow')
        moscow_datetime = finish.astimezone(desired_timezone)
        finish = moscow_datetime.replace(tzinfo=None)
        for channel in channels:
            streams = []
            for stream in channel.streams:
                if stream.start >= start and stream.finish <= finish:
                    streams.append(stream)
            channel.streams = streams

    return channels


def add_subscriber_to_channel(db: Session, user_id: int, channel_id: int):
    channel = db.query(models.Channel).filter(models.Channel.id == channel_id).first()
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if channel and user:
        channel.subscribers.append(user)
        db.add(channel)
        db.commit()


def update_channel_rating(
        db: Session,
        channel_id: int,
        mark: float,
):
    channel = db.query(models.Channel).filter(models.Channel.id == channel_id).first()

    if channel:
        channel.votes_count += 1
        channel.rating = ((float(channel.rating) * (channel.votes_count - 1)) + float(mark)) / channel.votes_count

        db.commit()

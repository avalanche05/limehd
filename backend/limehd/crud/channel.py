from typing import List, Type

from sqlalchemy import func, and_
from sqlalchemy.orm import Session
from limehd import models, schemas
from datetime import datetime


def get_channel_by_channel_id(db: Session, id: int) -> models.Channel:
    channel = db.query(models.Channel).filter(models.Channel.id == id).first()

    return channel


def get_channels(
        db: Session,
        search_name: str = None,
):
    query = db.query(models.Channel)

    if search_name:
        query = query.filter(models.Channel.name.ilike(f"%{search_name}%"))

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
        channel.rating = ((channel.rating * (channel.votes_count - 1)) + mark) / channel.votes_count

        db.commit()

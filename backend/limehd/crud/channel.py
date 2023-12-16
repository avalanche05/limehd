from typing import List, Type

from sqlalchemy import func, and_
from sqlalchemy.orm import Session
from limehd import models, schemas


def get_channel_by_channel_id(db: Session, id: int) -> models.Channel:
    channel = db.query(models.Channel).filter(models.Channel.id == id).first()

    return channel

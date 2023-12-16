from sqlalchemy import Integer, Float, String, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from werkzeug.security import generate_password_hash, check_password_hash

from limehd.db import BaseSqlModel
from limehd.models import association_table_channel_user


class Channel(BaseSqlModel):
    __tablename__ = 'channels'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String, unique=True, nullable=True)
    rating: Mapped[float] = mapped_column(String, default=0.0)
    votes_count: Mapped[int] = mapped_column(Integer, default=0)
    description: Mapped[str] = mapped_column(String, nullable=True)
    image: Mapped[str] = mapped_column(String, nullable=True)
    stream_link: Mapped[str] = mapped_column(String, nullable=True)

    subscribers: Mapped[list['User']] = relationship(
        secondary=association_table_channel_user,
        back_populates='channels'
    )
    streams: Mapped[list['Stream']] = relationship('Stream', back_populates='channel')

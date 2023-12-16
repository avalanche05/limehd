from sqlalchemy import Integer, Float, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from werkzeug.security import generate_password_hash, check_password_hash

from limehd.db import BaseSqlModel


class Channel(BaseSqlModel):
    __tablename__ = 'channels'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String, unique=True, nullable=True)
    rating: Mapped[float] = mapped_column(String, default=0.0)
    description: str
    image: str
    is_favorite: bool
    stream_link: str
    schedule: list[Stream]
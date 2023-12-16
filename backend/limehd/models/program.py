from typing import List

from sqlalchemy import Integer, Float, String, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import date

from limehd.db import BaseSqlModel
class Program(BaseSqlModel):
    __tablename__ = 'programs'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    start: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    finish: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    rating: Mapped[float] = mapped_column(Float, default=0.0)
    votes_count: Mapped[int] = mapped_column(Integer, default=0)
    genre: Mapped[str] = mapped_column(String, nullable=True)
    category: Mapped[str] = mapped_column(String, nullable=True)
    image: Mapped[str] = mapped_column(String, nullable=False)

    streams = relationship()
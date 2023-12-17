from sqlalchemy import Integer, Float, String, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import BaseSqlModel
from .program_user import association_table_program_user


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

    streams: Mapped[list['Stream']] = relationship(back_populates='program')
    subscribers: Mapped[list['User']] = relationship(
        secondary=association_table_program_user,
        back_populates='programs'
    )

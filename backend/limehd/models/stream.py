from sqlalchemy import Integer, Float, String, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from werkzeug.security import generate_password_hash, check_password_hash

from limehd.db import BaseSqlModel


class Stream(BaseSqlModel):
    __tablename__ = 'streams'
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    start: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    end: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    #relationship
    channel: Channel
    program: Program
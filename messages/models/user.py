from typing import List

from sqlalchemy import Integer, Float, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from werkzeug.security import generate_password_hash, check_password_hash

from .base import BaseSqlModel
from . import (association_table_channel_user, association_table_program_user)


class User(BaseSqlModel):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=True)
    hashed_password: Mapped[str] = mapped_column(String, nullable=True)
    fingerprint: Mapped[str] = mapped_column(String)

    channels: Mapped[list['Channel']] = relationship(
        secondary=association_table_channel_user,
        back_populates='subscribers',
    )
    programs: Mapped[list['Program']] = relationship(
        secondary=association_table_program_user,
        back_populates='subscribers',
    )

    def set_password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.hashed_password, password)

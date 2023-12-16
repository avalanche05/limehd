from sqlalchemy import ForeignKey, DateTime, Integer
from sqlalchemy.orm import relationship, Mapped, mapped_column

from limehd.db import BaseSqlModel


class Stream(BaseSqlModel):
    __tablename__ = 'streams'
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    start: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    finish: Mapped[DateTime] = mapped_column(DateTime, nullable=False)
    channel_id: Mapped[int] = mapped_column(Integer, ForeignKey('channels.id'))
    program_id: Mapped[int] = mapped_column(Integer, ForeignKey('programs.id'))

    channel: Mapped['Channel'] = relationship('Channel', back_populates='streams')
    program: Mapped['Program'] = relationship('Program', back_populates='streams')

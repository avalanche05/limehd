from sqlalchemy import Table, Column, ForeignKey

from limehd.db import BaseSqlModel

association_table_channel_program = Table(
    "association_table_channel_program",
    BaseSqlModel.metadata,
    Column("program_id", ForeignKey("programs.id"), primary_key=True),
    Column("channel_id", ForeignKey("channels.id"), primary_key=True),
)

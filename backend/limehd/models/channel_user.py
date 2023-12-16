from sqlalchemy import Table, Column, ForeignKey

from limehd.db import BaseSqlModel

association_table_channel_user = Table(
    "association_table_channel_user",
    BaseSqlModel.metadata,
    Column("user_id", ForeignKey("users.id"), primary_key=True),
    Column("channel_id", ForeignKey("channels.id"), primary_key=True),
)

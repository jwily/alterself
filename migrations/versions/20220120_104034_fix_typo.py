"""Fix typo

Revision ID: b20b92aa75ff
Revises: 56d1558294ff
Create Date: 2022-01-20 10:40:34.871720

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b20b92aa75ff'
down_revision = '56d1558294ff'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('characters', sa.Column(
        'hd_max', sa.Integer(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('characters', 'hd_max')
    # ### end Alembic commands ###

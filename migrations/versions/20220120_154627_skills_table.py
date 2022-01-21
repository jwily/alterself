"""Skills table

Revision ID: f778fb8405fd
Revises: 07e011f2c2b2
Create Date: 2022-01-20 15:46:27.615093

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f778fb8405fd'
down_revision = '07e011f2c2b2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('skills',
    sa.Column('char_id', sa.Integer(), nullable=False),
    sa.Column('skill_num', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['char_id'], ['characters.id'], ),
    sa.PrimaryKeyConstraint('char_id', 'skill_num', name='skill_pk')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('skills')
    # ### end Alembic commands ###

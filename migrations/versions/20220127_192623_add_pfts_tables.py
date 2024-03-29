"""Add pfts tables

Revision ID: 2bedae645449
Revises: 4ad459866fb9
Create Date: 2022-01-27 19:26:23.352140

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '2bedae645449'
down_revision = '4ad459866fb9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('features',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('char_id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=255), nullable=False),
                    sa.Column('description', sa.Text(), nullable=True),
                    sa.Column('created_at', sa.DateTime(),
                              server_default=sa.text('now()'), nullable=False),
                    sa.Column('updated_at', sa.DateTime(),
                              server_default=sa.text('now()'), nullable=False),
                    sa.ForeignKeyConstraint(['char_id'], ['characters.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('proficiencies',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('char_id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=255), nullable=False),
                    sa.Column('description', sa.Text(), nullable=True),
                    sa.Column('created_at', sa.DateTime(),
                              server_default=sa.text('now()'), nullable=False),
                    sa.Column('updated_at', sa.DateTime(),
                              server_default=sa.text('now()'), nullable=False),
                    sa.ForeignKeyConstraint(['char_id'], ['characters.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    # ### end Alembic commands ###

    if environment == "production":
        op.execute(f"ALTER TABLE features SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE proficiencies SET SCHEMA {SCHEMA};")


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('proficiencies')
    op.drop_table('features')
    # ### end Alembic commands ###

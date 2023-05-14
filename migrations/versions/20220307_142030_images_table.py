"""images table

Revision ID: 3525ff21188d
Revises: f0e12a552969
Create Date: 2022-03-07 14:20:30.969356

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '3525ff21188d'
down_revision = 'f0e12a552969'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('images',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('url', sa.String(length=255), nullable=False),
                    sa.Column('created_at', sa.DateTime(),
                              server_default=sa.text('now()'), nullable=False),
                    sa.ForeignKeyConstraint(['user_id'], ['characters.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.add_column('characters', sa.Column(
        'image_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'characters', 'images', ['image_id'], ['id'])
    # ### end Alembic commands ###

    if environment == "production":
        op.execute(f"ALTER TABLE images SET SCHEMA {SCHEMA};")


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'characters', type_='foreignkey')
    op.drop_column('characters', 'image_id')
    op.drop_table('images')
    # ### end Alembic commands ###

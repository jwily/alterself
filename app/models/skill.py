from .db import db, add_prefix_for_prod, environment, SCHEMA
from sqlalchemy import PrimaryKeyConstraint


class Skill(db.Model):
    __tablename__ = 'skills'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    char_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('characters.id')), nullable=False)
    skill_num = db.Column(db.Integer, nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint(char_id, skill_num, name='skill_pk'),
    )

    character = db.relationship('Character', back_populates='skills')

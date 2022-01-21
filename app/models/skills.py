from .db import db
from sqlalchemy import PrimaryKeyConstraint


class Skill(db.Model):
    __tablename__ = 'skills'

    char_id = db.Column(db.Integer, db.ForeignKey(
        'characters.id'), nullable=False)
    skill_num = db.Column(db.Integer, nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint(char_id, skill_num, name='skill_pk'),
    )

    character = db.relationship('Character', back_populates='skills')

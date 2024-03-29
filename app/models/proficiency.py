from .db import db, add_prefix_for_prod, environment, SCHEMA
from sqlalchemy.sql import func


class Proficiency(db.Model):
    __tablename__ = 'proficiencies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    char_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('characters.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(
        db.DateTime, server_default=func.now(), nullable=False)
    updated_at = db.Column(
        db.DateTime, server_default=func.now(), onupdate=func.now(), nullable=False
    )

    character = db.relationship('Character', back_populates='profs')
    user = db.relationship('User', back_populates='profs')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'charId': self.char_id,
            'description': self.description,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }

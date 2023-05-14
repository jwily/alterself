from .db import db, add_prefix_for_prod
from sqlalchemy.sql import func


class Feature(db.Model):
    __tablename__ = 'features'

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

    character = db.relationship('Character', back_populates='features')
    user = db.relationship('User', back_populates='features')

    def to_dict(self):
        return {
            'id': self.id,
            'charId': self.char_id,
            'name': self.name,
            'description': self.description,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }

from .db import db, add_prefix_for_prod, environment, SCHEMA
from sqlalchemy.sql import func


class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(
        db.DateTime, server_default=func.now(), nullable=False)

    characters = db.relationship('Character', back_populates='image')
    user = db.relationship('User', back_populates='images')

    def to_dict(self):
        return {
            'id': self.id,
            'createdAt': self.created_at,
            'url': self.url
        }

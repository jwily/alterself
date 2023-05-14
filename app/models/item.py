from .db import db, add_prefix_for_prod
from sqlalchemy.sql import func


class Item(db.Model):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    char_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('characters.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(
        db.DateTime, server_default=func.now(), nullable=False)
    updated_at = db.Column(
        db.DateTime, server_default=func.now(), onupdate=func.now(), nullable=False
    )

    character = db.relationship('Character', back_populates='items')
    user = db.relationship('User', back_populates='items')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'charId': self.char_id,
            'quantity': self.quantity,
            'description': self.description,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }

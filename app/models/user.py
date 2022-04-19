from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func

memberships = db.Table(
    "memberships",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    ),
    db.Column(
        "campaign_id",
        db.Integer,
        db.ForeignKey("campaigns.id"),
        primary_key=True
    )
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    characters = db.relationship('Character', back_populates='user')
    items = db.relationship('Item', back_populates='user')
    features = db.relationship('Feature', back_populates='user')
    profs = db.relationship('Proficiency', back_populates='user')
    owned_campaigns = db.relationship('Campaign', back_populates='user')
    joined_campaigns = db.relationship(
        'Campaign', secondary=memberships, back_populates='members')
    images = db.relationship('Image', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'name': self.first_name,
            'email': self.email,
            # 'owned': {room.id: room.to_dict() for room in self.owned_campaigns},
            # 'joined': {room.id: room.to_dict() for room in self.joined_campaigns}
        }


class Campaign(db.Model):
    __tablename__ = 'campaigns'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(
        db.DateTime, server_default=func.now(), nullable=False)
    updated_at = db.Column(
        db.DateTime, server_default=func.now(), onupdate=func.now(), nullable=False
    )

    user = db.relationship('User', back_populates='owned_campaigns')
    characters = db.relationship('Character', back_populates='campaign')
    members = db.relationship(
        'User', secondary=memberships, back_populates='joined_campaigns')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'notes': self.notes,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

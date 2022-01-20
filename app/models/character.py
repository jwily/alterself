from email.policy import default
from .db import db
from sqlalchemy.sql import func


class Character(db.Model):
    __tablename__ = 'characters'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    char_class = db.Column(db.String(40), nullable=False)
    race = db.Column(db.String(40), nullable=False)
    background = db.Column(db.String(40), nullable=False)
    description = db.Column(db.Text, nullable=True)
    level = db.Column(db.Integer, nullable=False, default=1)
    exp = db.Column(db.Integer, nullable=False, default=0)
    armor = db.Column(db.Integer, nullable=True)
    speed = db.Column(db.String(10), nullable=True)
    hp_curr = db.Column(db.Intger, nullable=True, default=0)
    hp_max = db.Column(db.Intger, nullable=True, default=0)
    hp_temp = db.Column(db.Intger, nullable=True, default=0)
    hd_curr = db.Column(db.Intger, nullable=True, default=1)
    hp_max = db.Column(db.Intger, nullable=True, default=1)

from .db import db


class AbilityName(db.Model):
    __tablename__ = 'ability_names'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)

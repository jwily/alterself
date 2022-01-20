from .db import db
from sqlalchemy.sql import func


class Character(db.Model):
    __tablename__ = 'characters'

    # Expects name, class, race, background from user

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    char_class = db.Column(db.String(40), nullable=False)
    race = db.Column(db.String(40), nullable=False)
    background = db.Column(db.String(40), nullable=False)
    description = db.Column(db.Text, nullable=True)
    level = db.Column(db.Integer, nullable=False, default=1)
    exp = db.Column(db.Integer, nullable=False, default=0)
    armor = db.Column(db.Integer, nullable=False)
    speed = db.Column(db.Integer, nullable=False, default=30)
    hp_curr = db.Column(db.Integer, nullable=False, default=0)
    hp_max = db.Column(db.Integer, nullable=False, default=0)
    hp_temp = db.Column(db.Integer, nullable=False, default=0)
    hd_curr = db.Column(db.Integer, nullable=False, default=1)
    hd_max = db.Column(db.Integer, nullable=False, default=1)
    ds_pass = db.Column(db.Integer, nullable=False, default=0)
    ds_fail = db.Column(db.Integer, nullable=False, default=0)
    strength = db.Column(db.Integer, nullable=False, default=0)
    dexterity = db.Column(db.Integer, nullable=False, default=0)
    constitution = db.Column(db.Integer, nullable=False, default=0)
    intelligence = db.Column(db.Integer, nullable=False, default=0)
    wisdom = db.Column(db.Integer, nullable=False, default=0)
    charisma = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(
        db.DateTime, server_default=func.now(), nullable=False)
    updated_at = db.Column(
        db.DateTime, server_default=func.now(), onupdate=func.now(), nullable=False
    )

    user = db.relationship('User', back_populates='characters')

    def to_dict(self):
        return {
            'userId': self.user_id,
            'name': self.name,
            'class': self.char_class,
            'race': self.race,
            'background': self.background,
            'description': self.description,
            'level': self.level,
            'exp': self.exp,
            'armor': self.armor,
            'speed': self.speed,
            'hpCurr': self.hp_curr,
            'hpMax': self.hp_max,
            'hpTemp': self.hp_temp,
            'hdCurr': self.hd_curr,
            'hdMax': self.hd_max,
            'dsPass': self.ds_pass,
            'dsFail': self.ds_fail,
            'str': self.strength,
            'dex': self.dexterity,
            'con': self.constitution,
            'int': self.intelligence,
            'wis': self.wisdom,
            'cha': self.charisma,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }

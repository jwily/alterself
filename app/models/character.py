from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

char_titles = {
    'str': 'Strong',
    'dex': 'Dexterous',
    'con': 'Tough',
    'int': 'Intelligent',
    'wis': 'Wise',
    'cha': 'Charismatic',
    'strdex': 'Vigorous',
    'strcon': 'Unyielding',
    'strint': 'Consummate',
    'strwis': 'Stalwart',
    'strcha': 'Inspiring',
    'dexcon': 'Tireless',
    'dexint': 'Brilliant',
    'dexwis': 'Artful',
    'dexcha': 'Graceful',
    'conint': 'Unflinching',
    'conwis': 'Resilient',
    'concha': 'Vivacious',
    'intwis': 'Sagacious',
    'intcha': 'Cunning',
    'wischa': 'Insightful',
}


class Character(db.Model):
    __tablename__ = 'characters'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Expects name, class, race, background from user

    id = db.Column(db.Integer, primary_key=True)
    image_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('images.id')), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    campaign_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('campaigns.id')), nullable=True)
    name = db.Column(db.String(255), nullable=False)
    char_class = db.Column(db.String(40), nullable=False)
    sub_class = db.Column(db.String(40), nullable=True, default='')
    race = db.Column(db.String(40), nullable=False)
    background = db.Column(db.String(40), nullable=False)
    description = db.Column(db.Text, nullable=True, default='')
    level = db.Column(db.Integer, nullable=False, default=1)
    exp = db.Column(db.Integer, nullable=False, default=0)
    armor = db.Column(db.Integer, nullable=True, default=10)
    speed = db.Column(db.Integer, nullable=False, default=30)
    hp_curr = db.Column(db.Integer, nullable=False, default=10)
    hp_max = db.Column(db.Integer, nullable=False, default=10)
    hp_temp = db.Column(db.Integer, nullable=False, default=0)
    hd_curr = db.Column(db.Integer, nullable=False, default=1)
    hd_max = db.Column(db.Integer, nullable=False, default=1)
    ds_pass = db.Column(db.Integer, nullable=False, default=0)
    ds_fail = db.Column(db.Integer, nullable=False, default=0)
    strength = db.Column(db.Integer, nullable=False, default=10)
    dexterity = db.Column(db.Integer, nullable=False, default=10)
    constitution = db.Column(db.Integer, nullable=False, default=10)
    intelligence = db.Column(db.Integer, nullable=False, default=10)
    wisdom = db.Column(db.Integer, nullable=False, default=10)
    charisma = db.Column(db.Integer, nullable=False, default=10)
    created_at = db.Column(
        db.DateTime, server_default=func.now(), nullable=False)
    updated_at = db.Column(
        db.DateTime, server_default=func.now(), onupdate=func.now(), nullable=False
    )

    user = db.relationship('User', back_populates='characters')
    image = db.relationship('Image', back_populates='characters')
    campaign = db.relationship('Campaign', back_populates='characters')
    skills = db.relationship(
        'Skill', back_populates='character', cascade='all, delete')
    items = db.relationship(
        'Item', back_populates='character', cascade='all, delete')
    profs = db.relationship(
        'Proficiency', back_populates='character', cascade='all, delete')
    features = db.relationship(
        'Feature', back_populates='character', cascade='all, delete')

    def generate_title(self):

        scores = [
            ('str', self.strength),
            ('dex', self.dexterity),
            ('con', self.constitution),
            ('int', self.intelligence),
            ('wis', self.wisdom),
            ('cha', self.charisma),
        ]

        to_join = [k for (k, v) in scores if v >= 16]

        key = ''.join(to_join)

        if not key:
            return 'Awakening'

        if len(key) > 6:
            return 'Peerless'

        return char_titles[key]

    def to_dict(self):
        return {
            'id': self.id,
            'img': self.image.id if self.image else 0,
            'userId': self.user_id,
            'name': self.name,
            'class': self.char_class,
            'sub': self.sub_class,
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
            'title': self.generate_title(),
            'itemsById': sorted([item.id for item in self.items]),
            'featsById': sorted([feature.id for feature in self.features]),
            'profsById': sorted([prof.id for prof in self.profs]),
        }

from .db import db


class SkillName(db.Model):
    __tablename__ = 'skill_names'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)

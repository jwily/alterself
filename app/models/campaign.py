from .db import db, environment, SCHEMA


class Campaign(db.Model):
    __tablename__ = 'campaigns'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    # Pretend this model is finished.

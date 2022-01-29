from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class CreateCharacterForm(FlaskForm):
    name = StringField(validators=[DataRequired('Character name is required')])
    charClass = StringField(
        validators=[DataRequired('Character class is required')])
    race = StringField(validators=[DataRequired('Character race is required')])
    background = StringField(
        validators=[DataRequired('Character background is required')])

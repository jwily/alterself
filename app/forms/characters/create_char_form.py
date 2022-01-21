from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class CreateCharacterForm(FlaskForm):
    name = StringField(validators=[DataRequired()])
    charClass = StringField(validators=[DataRequired()])
    race = StringField(validators=[DataRequired()])
    background = StringField(validators=[DataRequired()])

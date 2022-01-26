from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class CreateCharacterForm(FlaskForm):
    strength = IntegerField(validators=[DataRequired()])
    dexterity = IntegerField(validators=[DataRequired()])
    constitution = IntegerField(validators=[DataRequired()])
    intelligence = IntegerField(validators=[DataRequired()])
    wisdom = IntegerField(validators=[DataRequired()])
    charisma = IntegerField(validators=[DataRequired()])

from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import NumberRange


class EditAbilitiesForm(FlaskForm):
    strength = IntegerField(validators=[NumberRange(
        max=99, min=0, message="Oops, I can't work with ability scores lower than 0 or higher than 99.")])
    dexterity = IntegerField(validators=[NumberRange(
        max=99, min=0, message="Oops, I can't work with ability scores lower than 0 or higher than 99.")])
    constitution = IntegerField(validators=[NumberRange(
        max=99, min=0, message="Oops, I can't work with ability scores lower than 0 or higher than 99.")])
    intelligence = IntegerField(validators=[NumberRange(
        max=99, min=0, message="Oops, I can't work with ability scores lower than 0 or higher than 99.")])
    wisdom = IntegerField(validators=[NumberRange(
        max=99, min=0, message="Oops, I can't work with ability scores lower than 0 or higher than 99.")])
    charisma = IntegerField(validators=[NumberRange(
        max=99, min=0, message="Oops, I can't work with ability scores lower than 0 or higher than 99.")])

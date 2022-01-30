from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import NumberRange


class EditAbilitiesForm(FlaskForm):
    strength = IntegerField(validators=[NumberRange(
        max=99, min=0, message='Ability scores must fall between 0 and 99')])
    dexterity = IntegerField(validators=[NumberRange(
        max=99, min=0, message='Ability scores must fall between 0 and 99')])
    constitution = IntegerField(validators=[NumberRange(
        max=99, min=0, message='Ability scores must fall between 0 and 99')])
    intelligence = IntegerField(validators=[NumberRange(
        max=99, min=0, message='Ability scores must fall between 0 and 99')])
    wisdom = IntegerField(validators=[NumberRange(
        max=99, min=0, message='Ability scores must fall between 0 and 99')])
    charisma = IntegerField(validators=[NumberRange(
        max=99, min=0, message='Ability scores must fall between 0 and 99')])

from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import InputRequired, NumberRange


class EditAbilitiesForm(FlaskForm):
    strength = IntegerField(validators=[NumberRange(
        max=20, min=0, message='Out of range error.')])
    dexterity = IntegerField(validators=[NumberRange(
        max=20, min=0, message='Out of range error.')])

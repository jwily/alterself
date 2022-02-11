from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import NumberRange


class EditVitalsForm(FlaskForm):
    hpCurr = IntegerField(validators=[NumberRange(min=0)])
    hpMax = IntegerField(validators=[NumberRange(min=0)])
    hpTemp = IntegerField(validators=[NumberRange(min=0)])

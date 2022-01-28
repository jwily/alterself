from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, NumberRange


class ItemForm(FlaskForm):
    name = StringField(validators=[DataRequired()])
    description = StringField()
    quantity = IntegerField(
        validators=[NumberRange(min=0, message='Out of range error.')])

from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, NumberRange, Length


class ItemForm(FlaskForm):
    name = StringField(validators=[DataRequired(), Length(
        max=255, message='Item name must not exceed 255 characters')])
    description = StringField()
    quantity = IntegerField(
        validators=[NumberRange(min=0, message='Out of range error.')])

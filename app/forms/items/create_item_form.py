from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class CreateItemForm(FlaskForm):
    name = StringField(validators=[DataRequired()])
    description = StringField()
    quantity = IntegerField()

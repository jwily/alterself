from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import NumberRange


class UpdateQuantityForm(FlaskForm):
    quantity = IntegerField(
        validators=[NumberRange(min=0, message="How can one have negative items? Hmmm perhaps this requires research.")])

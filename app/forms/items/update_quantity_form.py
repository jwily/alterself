from flask_wtf import FlaskForm
from wtforms import IntegerField


class UpdateQuantityForm(FlaskForm):
    quantity = IntegerField()

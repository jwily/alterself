from flask_wtf import FlaskForm
from wtforms import IntegerField


class EditImageForm(FlaskForm):
    img = IntegerField()

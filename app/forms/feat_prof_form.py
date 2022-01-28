from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class FeatProfForm(FlaskForm):
    name = StringField(validators=[DataRequired()])
    description = StringField()

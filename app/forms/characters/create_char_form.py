from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class CreateCharacterForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    char_class = StringField('char_class', validators=[DataRequired()])
    race = StringField('race', validators=[DataRequired()])
    background = StringField('background', validators=[DataRequired()])

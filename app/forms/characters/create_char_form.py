from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class CreateCharacterForm(FlaskForm):
    name = StringField(validators=[DataRequired('Character name is required'), Length(
        max=255, message='Character name cannot exceed 255 characters')])
    charClass = StringField(
        validators=[DataRequired('Character class is required'), Length(max=40, message='Class name cannot exceed 40 characters')])
    race = StringField(validators=[DataRequired('Character race is required'), Length(
        max=40, message='Race name cannot exceed 40 characters')])
    background = StringField(
        validators=[DataRequired('Character background is required'),  Length(
            max=40, message='Background name cannot exceed 40 characters')])
    img = IntegerField()

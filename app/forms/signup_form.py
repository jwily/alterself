from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use')


class SignUpForm(FlaskForm):
    username = StringField(validators=[DataRequired(
        'Username is required'), Length(max=255, message='Username must not exceed 255 characters'), username_exists])
    email = StringField(validators=[DataRequired(
        'Email address is required'), Length(max=255, message='Email address must not exceed 255 characters'), user_exists])
    firstName = StringField(
        validators=[DataRequired('First name is required'), Length(max=40, message='First name must not exceed 40 characters')])
    password = StringField(validators=[DataRequired('Password is required')])

from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email is already in use')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use')


class SignUpForm(FlaskForm):
    username = StringField(validators=[DataRequired(
        'Username required'), username_exists])
    email = StringField(validators=[DataRequired(
        'Email address required'), user_exists])
    firstName = StringField(
        validators=[DataRequired('First name required')])
    lastName = StringField(validators=[DataRequired('Last name required')])
    password = StringField(validators=[DataRequired('Password required')])

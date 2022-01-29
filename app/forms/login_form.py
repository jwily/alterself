from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user and form.data['password']:
        raise ValidationError('Login failed with given credentials')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if user and not user.check_password(password):
        raise ValidationError('Login failed with given credentials')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(
        'Email address is required'), user_exists])
    password = StringField('password', validators=[
                           DataRequired('Password is required'), password_matches])

from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Character, User, db
from app.forms import CreateCharacterForm

character_routes = Blueprint('characters', __name__)

# Consider how to handle unauthorized character requests


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@character_routes.route('/', methods=['GET'])
@login_required
def get_chars():
    chars = User.query.get(current_user.id).characters
    return {char.id: char.to_dict_roster() for char in chars}


@character_routes.route('/', methods=['POST'])
@login_required
def create_char():
    form = CreateCharacterForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        char = Character(
            user_id=current_user.id,
            name=form.data['name'],
            race=form.data['race'],
            char_class=form.data['char_class'],
            background=form.data['background'],
        )
        db.session.add(char)
        db.session.commit()
        return char.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@character_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_char(id):
    char = Character.query.filter(
        Character.id == id, Character.user_id == current_user.id).one()
    return {'character': char.to_dict()}


@character_routes.route('/<int:id>/skills', methods=['GET'])
@login_required
def get_skills(id):
    skills = Character.query.filter(
        Character.id == id, Character.user_id == current_user.id).one().skills
    return {'entities': {skill.skill_num: True for skill in skills}}

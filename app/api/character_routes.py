from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Character, User

character_routes = Blueprint('characters', __name__)

# Consider how to handle unauthorized character requests


@character_routes.route('/', methods=['GET'])
@login_required
def get_chars():
    chars = User.query.get(current_user.id).characters
    return {char.id: char.to_dict_roster() for char in chars}


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
    return {'skills': {skill.skill_num: True for skill in skills}}

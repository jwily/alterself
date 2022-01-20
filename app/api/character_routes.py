from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Character, User

character_routes = Blueprint('characters', __name__)

# Consider how to handle unauthorized character requests


@character_routes.route('/')
@login_required
def get_chars():
    chars = User.query.get(current_user.id).characters
    return {char.id: char.to_dict_roster() for char in chars}


@character_routes.route('/<int:id>')
@login_required
def get_char(id):
    char = Character.query.filter(
        Character.id == id, Character.user_id == current_user.id).one()
    return {'char': char.to_dict()}

from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Character, User

character_routes = Blueprint('characters', __name__)


@character_routes.route('/')
@login_required
def get_chars():
    chars = User.query.get(current_user.id).characters
    return {char.id: char.to_dict() for char in chars}

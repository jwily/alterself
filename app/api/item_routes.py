from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Item, Character, db

item_routes = Blueprint('items', __name__)

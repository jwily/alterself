from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Item, db
from app.forms import DeleteItemForm

item_routes = Blueprint('items', __name__)


@item_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_item(id):
    form = DeleteItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        item = Item.query.get(id)
        if item:
            db.session.delete(item)
            db.session.commit()
            return {'message': 'Item successfully deleted.',
                    'itemId': id}
        else:
            return {'error': 'Item not found.'}, 400
    return {'error': 'An error has occurred. Please try again.'}, 401


@item_routes.route('/<int:id>/', methods=['PATCH'])
@login_required
def edit_abilities(id):
    form = EditAbilitiesForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        char = Character.query.filter(
            Character.id == id, Character.user_id == current_user.id).one()
        if char:
            char.strength = form.data['strength']
            char.dexterity = form.data['dexterity']
            char.constitution = form.data['constitution']
            char.intelligence = form.data['intelligence']
            char.wisdom = form.data['wisdom']
            char.charisma = form.data['charisma']
            db.session.commit()
            return {'character': char.to_dict()}
        else:
            return {'error': 'Character not found.'}, 400
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

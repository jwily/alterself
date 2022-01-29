from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Item, db, Character
from app.forms import DeleteForm, ItemForm, UpdateQuantityForm
from sqlalchemy.sql import func


item_routes = Blueprint('items', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@item_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_item(id):
    form = DeleteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        item = Item.query.get(id)
        if item:
            char = Character.query.filter(
                Character.id == item.char_id, Character.user_id == current_user.id).first()
            char.updated_at = func.now()
            db.session.delete(item)
            db.session.commit()
            return {'message': 'Item successfully deleted.',
                    'itemId': id}
        else:
            return {'error': 'Item not found.'}, 404
    return {'error': 'An error has occurred. Please try again.'}, 401


@item_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_item(id):
    form = ItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        item = Item.query.get(id)
        if item:
            char = Character.query.filter(
                Character.id == item.char_id, Character.user_id == current_user.id).first()
            char.updated_at = func.now()
            item.name = form.data['name']
            item.description = form.data['description']
            item.quantity = form.data['quantity']
            db.session.commit()
            return item.to_dict()
        else:
            return {'error': 'Item not found.'}, 404
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@item_routes.route('/<int:id>/quantity', methods=['PATCH'])
@login_required
def update_quantity(id):
    form = UpdateQuantityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        item = Item.query.get(id)
        if item:
            char = Character.query.filter(
                Character.id == item.char_id, Character.user_id == current_user.id).first()
            char.updated_at = func.now()
            item.quantity = form.data['quantity']
            db.session.commit()
            return item.to_dict()
        else:
            return {'error': 'Item not found.'}, 404
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

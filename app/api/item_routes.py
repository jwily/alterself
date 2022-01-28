from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Item, db
from app.forms import DeleteItemForm, ItemForm

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


@item_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_item(id):
    form = ItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        item = Item.query.get(id)
        if item:
            item.name = form.data['name']
            item.quantity = form.data['quantity']
            item.description = form.data['description']
            db.session.commit()
            return item.to_dict()
        else:
            return {'error': 'Item not found.'}, 400
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

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

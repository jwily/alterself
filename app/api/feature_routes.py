from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Feature, db, Character
from app.forms import FeatForm, DeleteForm
from sqlalchemy.sql import func

feature_routes = Blueprint('features', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@feature_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_feat(id):
    form = DeleteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        feat = Feature.query.get(id)
        if feat:
            char = Character.query.filter(
                Character.id == feat.char_id, Character.user_id == current_user.id).first()
            char.updated_at = func.now()
            db.session.delete(feat)
            db.session.commit()
            return {'message': 'Feature successfully deleted.',
                    'featId': id,
                    'charId': feat.char_id,
                    'newArray': [feat.id for feat in char.features],
                    'updatedAt': char.updated_at}
        else:
            return {'errors': ['Feature not found.']}, 404
    return {'errors': ['An error has occurred. Please try again.']}, 401


@feature_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_feat(id):
    form = FeatForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        feat = Feature.query.get(id)
        if feat:
            char = Character.query.filter(
                Character.id == feat.char_id, Character.user_id == current_user.id).first()
            char.updated_at = func.now()
            feat.name = form.data['name']
            feat.description = form.data['description']
            db.session.commit()
            return feat.to_dict()
        else:
            return {'errors': ['Feature not found.']}, 404
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

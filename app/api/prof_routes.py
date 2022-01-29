from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Proficiency, db, Character
from app.forms import FeatProfForm, DeleteForm
from sqlalchemy.sql import func

prof_routes = Blueprint('profs', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@prof_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_prof(id):
    form = DeleteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        prof = Proficiency.query.get(id)
        if prof:
            char = Character.query.filter(
                Character.id == prof.char_id, Character.user_id == current_user.id).first()
            char.updated_at = func.now()
            db.session.delete(prof)
            db.session.commit()
            return {'message': 'Item successfully deleted.',
                    'profId': id}
        else:
            return {'error': 'Proficiency not found.'}, 404
    return {'error': 'An error has occurred. Please try again.'}, 401


@prof_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_prof(id):
    form = FeatProfForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        prof = Proficiency.query.get(id)
        if prof:
            char = Character.query.filter(
                Character.id == prof.char_id, Character.user_id == current_user.id).first()
            char.updated_at = func.now()
            prof.name = form.data['name']
            prof.description = form.data['description']
            db.session.commit()
            return prof.to_dict()
        else:
            return {'error': 'Proficiency not found.'}, 404
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Character, User, db, Item, Feature, Proficiency
from app.forms import CreateCharacterForm, DeleteForm, ItemForm, EditAbilitiesForm, FeatForm, ProfForm, EditVitalsForm
from sqlalchemy.sql import func

character_routes = Blueprint('characters', __name__)

# Consider how to handle unauthorized character requests


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@character_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_data(id):
    if id == current_user.id:
        chars = {char.id: char.to_dict() for char in current_user.characters}
        items = {item.id: item.to_dict() for item in current_user.items}
        profs = {prof.id: prof.to_dict() for prof in current_user.profs}
        feats = {feat.id: feat.to_dict() for feat in current_user.features}
        imgs = {img.id: img.to_dict() for img in current_user.images}
        return {
            'chars': chars,
            'items': items,
            'profs': profs,
            'feats': feats,
            'imgs': imgs
        }


@character_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_char(id):
    form = DeleteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        char = Character.query.filter(
            Character.id == id, Character.user_id == current_user.id).first()
        if char:
            db.session.delete(char)
            db.session.commit()
            return {'message': 'Character successfully deleted.',
                    'charId': id}
        else:
            return {'errors': ['Character not found.']}, 404
    return {'errors': ['An error has occurred. Please try again.']}, 401


@character_routes.route('/', methods=['POST'])
@login_required
def create_char():
    form = CreateCharacterForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        char = Character(
            user_id=current_user.id,
            name=form.data['name'],
            race=form.data['race'],
            char_class=form.data['charClass'],
            background=form.data['background'],
        )

        db.session.add(char)
        db.session.commit()

        langs = Proficiency(
            char_id=char.id,
            user_id=current_user.id,
            name='Languages'
        )

        equips = Proficiency(
            char_id=char.id,
            user_id=current_user.id,
            name='Arms and Armor'
        )

        tools = Proficiency(
            char_id=char.id,
            user_id=current_user.id,
            name='Tools'
        )

        db.session.add(langs)
        db.session.add(equips)
        db.session.add(tools)

        db.session.commit()
        return char.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@character_routes.route('/<int:id>/items', methods=['POST'])
@login_required
def create_item(id):
    form = ItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        item = Item(
            user_id=current_user.id,
            char_id=id,
            name=form.data['name'],
            description=form.data['description'],
            quantity=form.data['quantity']
        )
        char = Character.query.filter(
            Character.id == id, Character.user_id == current_user.id).first()
        char.updated_at = func.now()
        db.session.add(item)
        db.session.commit()
        return item.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@character_routes.route('/<int:id>/features', methods=['POST'])
@login_required
def create_feat(id):
    form = FeatForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        feat = Feature(
            user_id=current_user.id,
            char_id=id,
            name=form.data['name'],
            description=form.data['description']
        )
        char = Character.query.filter(
            Character.id == id, Character.user_id == current_user.id).first()
        char.updated_at = func.now()
        db.session.add(feat)
        db.session.commit()
        return feat.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@character_routes.route('/<int:id>/profs', methods=['POST'])
@login_required
def create_prof(id):
    form = ProfForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        prof = Proficiency(
            user_id=current_user.id,
            char_id=id,
            name=form.data['name'],
            description=form.data['description']
        )
        char = Character.query.filter(
            Character.id == id, Character.user_id == current_user.id).first()
        char.updated_at = func.now()
        db.session.add(prof)
        db.session.commit()
        return prof.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@character_routes.route('/<int:id>/abilities', methods=['PATCH'])
@login_required
def edit_abilities(id):
    form = EditAbilitiesForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        char = Character.query.filter(
            Character.id == id, Character.user_id == current_user.id).first()
        if char:
            char.strength = form.data['strength']
            char.dexterity = form.data['dexterity']
            char.constitution = form.data['constitution']
            char.intelligence = form.data['intelligence']
            char.wisdom = form.data['wisdom']
            char.charisma = form.data['charisma']
            db.session.commit()
            return char.to_dict()
        else:
            return {'errors': ['Character not found.']}, 404
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@character_routes.route('/<int:id>/vitals', methods=['PATCH'])
@login_required
def edit_vitals(id):
    form = EditVitalsForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        char = Character.query.filter(
            Character.id == id, Character.user_id == current_user.id).first()
        if char:
            char.hp_curr = form.data['hpCurr']
            char.hp_max = form.data['hpMax']
            char.hp_temp = form.data['hpTemp']
            db.session.commit()
            return char.to_dict()
        else:
            return {'errors': ['Character not found.']}, 404
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@character_routes.route('/<int:id>/core', methods=['PATCH'])
@login_required
def edit_core(id):
    form = CreateCharacterForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        char = Character.query.filter(
            Character.id == id, Character.user_id == current_user.id).first()
        if char:
            char.name = form.data['name']
            char.race = form.data['race']
            char.char_class = form.data['charClass']
            char.background = form.data['background']
            db.session.commit()
            return char.to_dict()
        else:
            return {'errors': ['Character not found.']}, 404
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

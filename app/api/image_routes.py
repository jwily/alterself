from flask import Blueprint, request
from app.models import db, Image
from flask_login import current_user, login_required
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)
from app.forms import DeleteForm
from io import BytesIO

image_routes = Blueprint("images", __name__)


@image_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_image():
    form = DeleteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image = Image.query.get(id)
        if image:
            db.session.delete(image)
            db.session.commit()
            return {'message': 'Image successfully deleted.',
                    'imageId': id}
        else:
            return {'errors': ['Image not found.']}, 404
    return {'errors': ['An error has occurred. Please try again.']}, 401


@image_routes.route("", methods=["POST"])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]
    # image_bytes = BytesIO(image.stream.read())
    # image_object = Image.open(image_bytes)
    # size = image_object.size

    # print(size)

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_image = Image(user_id=current_user.id, url=url)
    db.session.add(new_image)
    db.session.commit()
    return new_image.to_dict()

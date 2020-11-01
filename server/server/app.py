import functools
import os
import uuid
from http import HTTPStatus

from flask import jsonify, request, send_file
from werkzeug.utils import secure_filename

from . import app, db
from .models import ImageUpload


@app.before_first_request
def initialize():
    os.makedirs(
        os.path.join(app.instance_path, app.config["IMAGE_UPLOAD_FOLDER"]),
        exist_ok=True,
    )


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/api/images", methods=["GET"])
def get_images():
    images = ImageUpload.query.with_entities(ImageUpload.id, ImageUpload.title).all()

    return jsonify(
        [
            {"href": get_image_href_from_id(image[0]), "title": image[1]}
            for image in images
        ]
    )


@app.route("/api/images/<int:imageId>", methods=["GET"])
def get_image(imageId):
    image = ImageUpload.query.get_or_404(imageId)
    return send_file(get_image_path_from_name(image.path_uuid))


@app.route("/api/images", methods=["POST"])
def upload_image():
    image_upload = request.files["image"]

    filename = secure_filename(image_upload.filename)
    extension = os.path.splitext(filename)[1]

    image_path = str(uuid.uuid4()) + extension
    image_upload.save(get_image_path_from_name(image_path))

    image_entry = ImageUpload(
        title=secure_filename(image_upload.filename), path_uuid=image_path
    )

    db.session.add(image_entry)
    db.session.commit()

    return (
        jsonify({"status": "created", "href": get_image_href_from_id(image_entry.id)}),
        HTTPStatus.CREATED,
        {"Content-Type": "application/json"},
    )


def get_image_path_from_name(file_name):
    return os.path.join(app.instance_path, app.config["IMAGE_UPLOAD_FOLDER"], file_name)


def get_image_href_from_id(image_id):
    return "/api/images/%d" % image_id

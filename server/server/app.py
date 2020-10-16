import functools
import os

from flask import request, jsonify, send_file
from werkzeug.utils import secure_filename

from . import app, db
from .models import ImageUpload

@app.before_first_request
def initialize():
    db.create_all()
    os.makedirs(os.path.join(app.instance_path, app.config['IMAGE_UPLOAD_FOLDER']), exist_ok=True)


def return_json(f):
    @functools.wraps(f)
    def inner(**kwargs):
        return jsonify(f(**kwargs))

    return inner


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route('/api/images', methods=['GET'])
@return_json
def get_images():
    images = ImageUpload.query\
        .with_entities(ImageUpload.id, ImageUpload.title)\
        .all()

    return [{
        'id': image[0],
        'title': image[1]
    } for image in images]


@app.route('/api/image/<int:imageId>', methods=['GET'])
def get_image(imageId):
    image = ImageUpload.query.get_or_404(imageId)
    return send_file(get_image_path_from_name(image.title))

@app.route('/api/image', methods=['POST'])
@return_json
def upload_image():
    image_upload = request.files['image']

    file_name = secure_filename(image_upload.filename)
    image_upload.save(get_image_path_from_name(file_name))

    db.session.add(ImageUpload(title=secure_filename(image_upload.filename)))
    db.session.commit()

    return {'message': 'created'}

def get_image_path_from_name(file_name):
    return os.path.join(app.instance_path, app.config['IMAGE_UPLOAD_FOLDER'], file_name)
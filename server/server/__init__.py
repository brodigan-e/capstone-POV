import os

from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.config["IMAGE_UPLOAD_FOLDER"] = "image-uploads/"
app.config["PROCESSED_IMAGE_FOLDER"] = "image-processed/"
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app)


def create_folders_if_not_exists(folders):
    for folder in folders:
        folder_path = os.path.join(app.instance_path, folder)
        if not os.path.exists(folder_path):
            os.mkdir(folder_path)


create_folders_if_not_exists([app.config["IMAGE_UPLOAD_FOLDER"], app.config["PROCESSED_IMAGE_FOLDER"]])

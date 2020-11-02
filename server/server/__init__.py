from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.config["IMAGE_UPLOAD_FOLDER"] = "image-uploads/"
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app)


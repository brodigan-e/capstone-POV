from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

import RPi.GPIO as GPIO

in1 = 24
in2 = 23
en = 25
temp1 = 1

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.config["IMAGE_UPLOAD_FOLDER"] = "image-uploads/"
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app)

GPIO.setmode(GPIO.BCM)
GPIO.setup(in1, GPIO.OUT)
GPIO.setup(in2, GPIO.OUT)
GPIO.setup(en, GPIO.OUT)
GPIO.output(in1, GPIO.LOW)
GPIO.output(in2, GPIO.LOW)
p=GPIO.PWM(en, 1000)
p.start(25)


from dataclasses import dataclass
from datetime import datetime
from typing import Any

from . import db


@dataclass
class ImageUpload(db.Model):
    id: int
    title: str
    path_uuid: str
    uploadedAt: datetime
    isProcessed: bool

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    path_uuid = db.Column(db.String(32), nullable=False)
    uploadedAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    isProcessed = db.Column(db.Boolean, nullable=False, default=False)

from datetime import datetime
from dataclasses import dataclass
from typing import Any

from . import db

@dataclass
class ImageUpload(db.Model):
    id: int
    title: str
    uploadedAt: datetime
    isProcessed: bool

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    uploadedAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    isProcessed = db.Column(db.Boolean, nullable=False, default=False)

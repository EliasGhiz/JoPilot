#Used to initialize a flask instance and the endpoint routes
from flask import Flask
from flask_cors import CORS
from .database import db
import os

def create_app(test_config=None):
    app = Flask(__name__)
    CORS(app)

    if test_config:
        app.config.update(test_config)
    else:
        # Load DB URI from environment variable for safety
        db_uri = os.environ.get("SQLALCHEMY_DATABASE_URI")
        if not db_uri:
            # Optionally, load from .env file if present
            from dotenv import load_dotenv
            load_dotenv()
            db_uri = os.environ.get("SQLALCHEMY_DATABASE_URI")
        app.config["SQLALCHEMY_DATABASE_URI"] = db_uri or "sqlite:///database.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)

    from . import routes
    routes.initialize_app_endpoints(app)

    return app
#Used to initialize a flask instance and the endpoint routes
from flask import Flask
from flask_cors import CORS
from .database import db

def create_app(test_config=None):
    app = Flask(__name__)
    CORS(app)

    if test_config:
        app.config.update(test_config)
    else:
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)

    from . import routes
    routes.initialize_app_endpoints(app)

    return app
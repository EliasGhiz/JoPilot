#Used to initialize a flask instance and the endpoint routes
from flask import Flask
from flask_cors import CORS

 
def create_app():
    app = Flask(__name__)
    CORS(app)
    from . import routes
    routes.initialize_app_endpoints(app)
    return app
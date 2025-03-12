#Used to initialize a flask instance and the endpoint routes
from flask import Flask

def create_app():
    app = Flask(__name__)
    
    from . import routes
    routes.initialize_app_endpoints(app)
    
    return app
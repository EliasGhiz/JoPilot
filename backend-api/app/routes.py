#API endpoints
from flask import request, jsonify, render_template

def initialize_app_endpoints(app):
    
    #route for homepage
    @app.route('/') #parameters reflect web url path. This will be the homepage
    def home():
        return render_template('home.html')
    
    
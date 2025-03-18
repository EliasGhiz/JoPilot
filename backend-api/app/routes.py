#API endpoints
from flask import request, jsonify, render_template

def initialize_app_endpoints(app):
    
    #test sending data to react
    @app.route('/test') #parameters reflect web url path. This will be the homepage
    def test_endpoint():
        data = {'message': 'Test Message from API'}
        return jsonify(data)
        
    
    
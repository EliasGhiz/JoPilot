#API endpoints
from flask import request, jsonify, render_template, current_app as app

def initialize_app_endpoints(app):
    
    @app.route('/test')
    def test_endpoint():
        response_data = {'message': 'Test Message from API'}
        app.logger.info("Endpoint /test hit, sending JSON: %s", response_data)
        return jsonify(response_data)

    # New alias route to support /api/test requests
    @app.route('/api/test')
    def api_test_endpoint():
        # Reuse test_endpoint to avoid duplication
        return test_endpoint()


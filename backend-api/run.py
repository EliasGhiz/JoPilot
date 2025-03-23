# Runs instance of app

from app import create_app

app = create_app()

if __name__ == '__main__':
    # Bind to all interfaces so external health checks can connect (for deploying on Digital Ocean)
    # Note: For production, use a production-ready WSGI server like Gunicorn or similar.
    app.run(host='0.0.0.0', debug=True)
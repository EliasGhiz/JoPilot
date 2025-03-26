# Runs instance of app

from app import create_app
from app.database import db
from sqlalchemy import inspect
import os

app = create_app()

if __name__ == '__main__':
    # Use the PORT environment variable if defined, otherwise default to 5000.
    port = int(os.environ.get("PORT", 5000))
    # Creates database tables
    with app.app_context():
        db.create_all()
        inspector = inspect(db.engine)
        print(inspector.get_table_names())
    # Bind to all interfaces to allow external access.
    app.run(host='0.0.0.0', port=port, debug=True)
    
# Runs instance of app

from app import create_app
from app.database import db, User
from sqlalchemy import inspect
import os

app = create_app()

def create_test_user():
    existing = User.query.filter_by(Email="testuser@example.com").first()
    if not existing:
        user = User(
            Name="Test User",
            Email="testuser@example.com",
            Password="password123" 
        )
        db.session.add(user)
        db.session.commit()
        print(f"Test user created with UserID {user.UserID}")
    else:
        print("Test user already exists.")

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    with app.app_context():
        db.create_all()
        inspector = inspect(db.engine)
        print("Database tables:", inspector.get_table_names())
        create_test_user()  

    app.run(host='0.0.0.0', port=port, debug=True)
    
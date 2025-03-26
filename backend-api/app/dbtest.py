import pytest
from app import create_app, db
from app.database import User, Profile


TEST_CONFIG = {
    "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",
    "TESTING": True,
    "SQLALCHEMY_ECHO": False,
}

@pytest.fixture
def app():
    app = create_app(test_config=TEST_CONFIG)
    with app.app_context():
        db.create_all()
    yield app
    with app.app_context():
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()


def test_create_user(app, client):
    user = User(Name="John Doe", Password="password123", Email="john@example.com")
    with app.app_context():
        db.session.add(user)
        db.session.commit()
        created_user = User.query.filter_by(Email="john@example.com").first()
        
    assert created_user is not None
    assert created_user.Name == "John Doe"
    assert created_user.Email == "john@example.com"

def test_create_profile(app, client):
    user = User(Name="Jane Doe", Password="password123", Email="jane@example.com")
    profile = Profile(Resume="My Resume", Summary="Summary Text", user=user)
    
    with app.app_context():
        db.session.add(user)
        db.session.add(profile)
        db.session.commit()
        created_profile = Profile.query.filter_by(UserID=user.UserID).first()

    assert created_profile is not None
    assert created_profile.UserID == user.UserID
    assert created_profile.Resume == "My Resume"
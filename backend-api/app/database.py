from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

# Initialize SQLAlchemy
db = SQLAlchemy()

# Users Table
class User(db.Model):
    __tablename__ = 'Users'
    UserID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Name = db.Column(db.String(50))
    Email = db.Column(db.String(50), unique=True, nullable=False)
    Auth0ID = db.Column(db.String(128), unique=True)
    profiles = relationship('Profile', backref='user', cascade="all, delete")
    jobs = relationship('Job', backref='user', cascade="all, delete")
    applications = relationship('AppliedTo', backref='user', cascade="all, delete")
    bookmarks = relationship('Bookmark', backref='user', cascade="all, delete")

# Profile Table
class Profile(db.Model):
    __tablename__ = 'Profile'
    ProfileID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Resume = db.Column(db.Text)
    CoverLetter = db.Column(db.Text)
    FilterPreset = db.Column(db.Text)
    Summary = db.Column(db.Text)
    Feedback = db.Column(db.Text)
    ApplicationCount = db.Column(db.Integer)
    CallbackCount = db.Column(db.Integer)
    UserID = db.Column(db.Integer, ForeignKey('Users.UserID', ondelete='CASCADE'))
    autofill_answers = relationship('ProfileAutofillAnswer', backref='profile', cascade="all, delete")

# Profile_AutofillAnswer Table
class ProfileAutofillAnswer(db.Model):
    __tablename__ = 'Profile_AutofillAnswer'
    AutoFillID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Question = db.Column(db.Text, nullable=False)
    Answer = db.Column(db.Text, nullable=False)
    Enabled = db.Column(db.Boolean, default=True)
    ProfileID = db.Column(db.Integer, ForeignKey('Profile.ProfileID', ondelete='CASCADE'))

# Job Table
class Job(db.Model):
    __tablename__ = 'Job'
    JobID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Salary = db.Column(db.Numeric(10,2))
    Type = db.Column(db.String(50))
    Keywords = db.Column(db.Text)
    Description = db.Column(db.Text)
    Date = db.Column(db.Date, server_default=db.func.current_date())
    CompanyName = db.Column(db.String(50))
    UserID = db.Column(db.Integer, ForeignKey('Users.UserID', ondelete='SET NULL'))
    applications = relationship('AppliedTo', backref='job', cascade="all, delete")
    bookmarks = relationship('Bookmark', backref='job', cascade="all, delete")

# AppliedTo Table
class AppliedTo(db.Model):
    __tablename__ = 'AppliedTo'
    ApplicationID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Status = db.Column(db.String(50))
    FollowUpDeadline = db.Column(db.Date)
    Note = db.Column(db.Text)
    ParsedEmail = db.Column(db.Text)
    UserID = db.Column(db.Integer, ForeignKey('Users.UserID', ondelete='CASCADE'))
    JobID = db.Column(db.Integer, ForeignKey('Job.JobID', ondelete='CASCADE'))

# Bookmarks Table
class Bookmark(db.Model):
    __tablename__ = 'Bookmarks'
    UserID = db.Column(db.Integer, ForeignKey('Users.UserID', ondelete='CASCADE'), primary_key=True)
    JobID = db.Column(db.Integer, ForeignKey('Job.JobID', ondelete='CASCADE'), primary_key=True)
    Note = db.Column(db.Text)

def init_db(app):
    with app.app_context():
        db.create_all()

#Models are used to define the stucture of data managed by the application.
#This data will then, in most cases, be mapped to database tables. 

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    # make a unique ID for each user 
    id = db.Column(db.Integer, primary_key= True)
    email = db.Column(db.String(120) , unique=True , nullable=False )
    password_hash = db.Column(db.String(128), nullable=False)
    


 
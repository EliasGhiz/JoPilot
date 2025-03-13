#Models are used to define the stucture of data managed by the application.
#This data will then, in most cases, be mapped to database tables. 


#sample, do not use
class User:
    def __init__(self, email, username):
        self.email = email
        self.username = username

    #used to represent as string for debug
    def __repr__(self):
        return f'<User {self.username}>'
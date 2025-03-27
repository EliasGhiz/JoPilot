from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from models import db, User
import os
import jwt
import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test_users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'WOxwZDzPH0yp5sl21CTowBx04ickwH4f8sB5zAauoZb4m0xEDNqjV5uI-kL00XO4f8IrmTtPGgCkAQCRVZl4WQ'

db.init_app(app)
bcrypt = Bcrypt(app)

with app.app_context():
    db.create_all()

#register endpoint 
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'success': False, 'error': 'Email and password required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'success': False, 'error': 'Email already registered'}), 409

    password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password_hash=password_hash)

    db.session.add(new_user)
    db.session.commit()
 

    return jsonify({'success': True, 'message': 'User registered successfully'}), 201

#login api endpoint 
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if  not email or not password:
        return jsonify({'success' : False,'error': 'Email and password required'}),400
    user = User.query.filter_by(email=email).first()
    
    if not user or not bcrypt.check_password_hash(user.password_hash, password):
        return jsonify({'success': False, 'error': 'Invalid email or password'}), 401

 
  
    payload = {
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  
    }

 
    token = jwt.encode(payload, app.config['JWT_SECRET_KEY'], algorithm='HS256')

    return jsonify({'success': True, 'token': token}), 200    

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5001))
    app.run(host='0.0.0.0', port=port, debug=True)

 
 

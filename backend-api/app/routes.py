#API endpoints

from flask import request, jsonify, render_template, Blueprint, g
from .database import db, User, Profile, Job, AppliedTo, Bookmark
from jose import jwt 
from urllib.request import urlopen
import json
from functools import wraps

bp = Blueprint('api', __name__, url_prefix='/api')



# User Routes

@bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data or not data.get('Name') or not data.get('Email') or not data.get('Password'):
        return jsonify({"message": "Missing required fields"}), 400

    user = User(
        Name=data['Name'],
        Password=data['Password'],
        Email=data['Email'],
        ContactInfo=data.get('ContactInfo')
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({
        'UserID': user.UserID,
        'Name': user.Name,
        'Email': user.Email
    }), 201

@bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({
        'UserID': user.UserID,
        'Name': user.Name,
        'Email': user.Email,
        'ContactInfo': user.ContactInfo
    })

@bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    user = User.query.get_or_404(user_id)

    user.Name = data.get('Name', user.Name)
    user.Password = data.get('Password', user.Password)
    user.Email = data.get('Email', user.Email)
    user.ContactInfo = data.get('ContactInfo', user.ContactInfo)

    db.session.commit()

    return jsonify({
        'UserID': user.UserID,
        'Name': user.Name,
        'Email': user.Email
    })

@bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return '', 204

# Profile Routes

@bp.route('/profiles', methods=['POST'])
def create_profile():
    data = request.get_json()
    user_id = data.get('UserID')
    user = User.query.get_or_404(user_id)

    profile = Profile(
        Resume=data.get('Resume'),
        CoverLetter=data.get('CoverLetter'),
        Summary=data.get('Summary'),
        UserID=user.UserID
    )
    db.session.add(profile)
    db.session.commit()

    return jsonify({
        'ProfileID': profile.ProfileID,
        'UserID': profile.UserID,
        'Resume': profile.Resume,
        'Summary': profile.Summary
    }), 201

@bp.route('/profiles/<int:profile_id>', methods=['GET'])
def get_profile(profile_id):
    profile = Profile.query.get_or_404(profile_id)
    return jsonify({
        'ProfileID': profile.ProfileID,
        'UserID': profile.UserID,
        'Resume': profile.Resume,
        'Summary': profile.Summary
    })

@bp.route('/profiles/<int:profile_id>', methods=['PUT'])
def update_profile(profile_id):
    data = request.get_json()
    profile = Profile.query.get_or_404(profile_id)

    profile.Resume = data.get('Resume', profile.Resume)
    profile.CoverLetter = data.get('CoverLetter', profile.CoverLetter)
    profile.Summary = data.get('Summary', profile.Summary)

    db.session.commit()

    return jsonify({
        'ProfileID': profile.ProfileID,
        'UserID': profile.UserID,
        'Resume': profile.Resume,
        'Summary': profile.Summary
    })

@bp.route('/profiles/<int:profile_id>', methods=['DELETE'])
def delete_profile(profile_id):
    profile = Profile.query.get_or_404(profile_id)
    db.session.delete(profile)
    db.session.commit()
    return '', 204

# Job Routes

@bp.route('/jobs', methods=['POST'])
def create_job():
    data = request.get_json()
    user_id = data.get('UserID')
    user = User.query.get_or_404(user_id)

    job = Job(
        Salary=data.get('Salary'),
        Type=data.get('Type'),
        Keywords=data.get('Keywords'),
        Description=data.get('Description'),
        CompanyName=data.get('CompanyName'),
        UserID=user.UserID
    )
    db.session.add(job)
    db.session.commit()

    return jsonify({
        'JobID': job.JobID,
        'CompanyName': job.CompanyName,
        'Salary': job.Salary,
        'Type': job.Type
    }), 201

@bp.route('/jobs/<int:job_id>', methods=['GET'])
def get_job(job_id):
    job = Job.query.get_or_404(job_id)
    return jsonify({
        'JobID': job.JobID,
        'CompanyName': job.CompanyName,
        'Salary': job.Salary,
        'Description': job.Description
    })

@bp.route('/jobs/<int:job_id>', methods=['PUT'])
def update_job(job_id):
    data = request.get_json()
    job = Job.query.get_or_404(job_id)

    job.Salary = data.get('Salary', job.Salary)
    job.Type = data.get('Type', job.Type)
    job.Keywords = data.get('Keywords', job.Keywords)
    job.Description = data.get('Description', job.Description)
    job.CompanyName = data.get('CompanyName', job.CompanyName)

    db.session.commit()

    return jsonify({
        'JobID': job.JobID,
        'CompanyName': job.CompanyName,
        'Salary': job.Salary,
        'Type': job.Type
    })

@bp.route('/jobs/<int:job_id>', methods=['DELETE'])
def delete_job(job_id):
    job = Job.query.get_or_404(job_id)
    db.session.delete(job)
    db.session.commit()
    return '', 204

# AppliedTo Routes

@bp.route('/applications', methods=['POST'])
def create_application():
    data = request.get_json()
    user_id = data.get('UserID')
    job_id = data.get('JobID')
    user = User.query.get_or_404(user_id)
    job = Job.query.get_or_404(job_id)

    application = AppliedTo(
        Status=data.get('Status'),
        FollowUpDeadline=data.get('FollowUpDeadline'),
        Note=data.get('Note'),
        UserID=user.UserID,
        JobID=job.JobID
    )
    db.session.add(application)
    db.session.commit()

    return jsonify({
        'ApplicationID': application.ApplicationID,
        'Status': application.Status,
        'FollowUpDeadline': application.FollowUpDeadline
    }), 201

@bp.route('/applications/<int:application_id>', methods=['GET'])
def get_application(application_id):
    application = AppliedTo.query.get_or_404(application_id)
    return jsonify({
        'ApplicationID': application.ApplicationID,
        'Status': application.Status,
        'FollowUpDeadline': application.FollowUpDeadline,
        'Note': application.Note
    })

@bp.route('/applications/<int:application_id>', methods=['PUT'])
def update_application(application_id):
    data = request.get_json()
    application = AppliedTo.query.get_or_404(application_id)

    application.Status = data.get('Status', application.Status)
    application.FollowUpDeadline = data.get('FollowUpDeadline', application.FollowUpDeadline)
    application.Note = data.get('Note', application.Note)

    db.session.commit()

    return jsonify({
        'ApplicationID': application.ApplicationID,
        'Status': application.Status,
        'FollowUpDeadline': application.FollowUpDeadline
    })

@bp.route('/applications/<int:application_id>', methods=['DELETE'])
def delete_application(application_id):
    application = AppliedTo.query.get_or_404(application_id)
    db.session.delete(application)
    db.session.commit()
    return '', 204

# Bookmark Routes 

@bp.route('/bookmarks', methods=['POST'])
def create_bookmark():
    data = request.get_json()
    user_id = data.get('UserID')
    job_id = data.get('JobID')
    user = User.query.get_or_404(user_id)
    job = Job.query.get_or_404(job_id)

    bookmark = Bookmark(
        UserID=user.UserID,
        JobID=job.JobID,
        Note=data.get('Note')
    )
    db.session.add(bookmark)
    db.session.commit()

    return jsonify({
        'UserID': bookmark.UserID,
        'JobID': bookmark.JobID,
        'Note': bookmark.Note
    }), 201

@bp.route('/bookmarks/<int:user_id>/<int:job_id>', methods=['GET'])
def get_bookmark(user_id, job_id):
    bookmark = Bookmark.query.filter_by(UserID=user_id, JobID=job_id).first_or_404()
    return jsonify({
        'UserID': bookmark.UserID,
        'JobID': bookmark.JobID,
        'Note': bookmark.Note
    })

@bp.route('/bookmarks/<int:user_id>/<int:job_id>', methods=['PUT'])
def update_bookmark(user_id, job_id):
    data = request.get_json()
    bookmark = Bookmark.query.filter_by(UserID=user_id, JobID=job_id).first_or_404()

    bookmark.Note = data.get('Note', bookmark.Note)

    db.session.commit()

    return jsonify({
        'UserID': bookmark.UserID,
        'JobID': bookmark.JobID,
        'Note': bookmark.Note
    })

@bp.route('/bookmarks/<int:user_id>/<int:job_id>', methods=['DELETE'])
def delete_bookmark(user_id, job_id):
    bookmark = Bookmark.query.filter_by(UserID=user_id, JobID=job_id).first_or_404()
    db.session.delete(bookmark)
    db.session.commit()
    return '', 204
    

def initialize_app_endpoints(app):
    app.register_blueprint(bp)
    #test sending data to react
    @app.route('/test') #parameters reflect web url path. This will be the homepage
    def test_endpoint():
        response_data = {'message': 'Test Message from API'}
        app.logger.info("Endpoint /test hit, sending JSON: %s", response_data)
        return jsonify(response_data)

    # New alias route to support /api/test requests
    @app.route('/api/test')
    def api_test_endpoint():
        # Reuse test_endpoint to avoid duplication
        return test_endpoint()


#obtain access token 
def get_token_auth_header():
    auth = request.headers.get("Authorization", None)
    if not auth:
        raise Exception("Authorization header is expected")

    parts = auth.split()
    if parts[0].lower() != "bearer" or len(parts) != 2:
        raise Exception("Authorization header must be 'Bearer <token>'")
    return parts[1]


#wraps route to require authenication before letting it run
def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        
        token = get_token_auth_header()
        #fetch JWKS to sign JWT 
        jsonurl = urlopen(f"https://{AUTH0_DOMAIN}/.well-known/jwks.json")
        jwks = json.loads(jsonurl.read())
        unverified_header = jwt.get_unverified_header(token)

        #build RSA pulic key to verfiy tokens 
        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }

        #decode and verify token 
        if rsa_key:
            try:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms="RS256",
                    audience="https://jopilot-api",
                    issuer=f"https://{AUTH0_DOMAIN}/"
                )
                
                g.current_user = payload
            except jwt.ExpiredSignatureError:
                return jsonify({"message": "token expired"}), 401
            except jwt.JWTClaimsError:
                return jsonify({"message": "invalid claims"}), 401
            except Exception:
                return jsonify({"message": "invalid token"}), 400

            return f(*args, **kwargs)

        return jsonify({"message": "Unable to find appropriate key"}), 400

    return decorated

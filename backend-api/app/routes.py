#API endpoints

from flask import request, jsonify, render_template, Blueprint
from werkzeug.utils import secure_filename
import tempfile
from .database import db, User, Profile, Job, AppliedTo, Bookmark
from .API_Analysis import extract_text, optimize_resume
import os

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


#Resume analysis endpoint
# Define the allowed file extensions
ALLOWED_EXTENSIONS = {'pdf', 'docx'}

# Helper function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@bp.route('/analyze-resume', methods=['POST'])
def analyze_resume():
    # Check if a file is included in the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    # Check if the file has a valid name and extension
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if not allowed_file(file.filename):
        return jsonify({'error': 'Unsupported file type. Please upload a PDF or DOCX file.'}), 400

    try:
        # Secure the filename and save the file temporarily
        filename = secure_filename(file.filename)
        temp_dir = tempfile.gettempdir()
        temp_path = os.path.join(temp_dir, filename)
        file.save(temp_path)

        # Extract text from the file
        resume_text = extract_text(temp_path)

        # Optimize the resume using the DeepSeek API
        feedback = optimize_resume(resume_text)

        # Clean up the temporary file
        os.remove(temp_path)

        # Return the optimization suggestions
        return jsonify({'suggestions': feedback}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
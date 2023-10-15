from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User#, Doctor, Patient
from werkzeug.security import generate_password_hash, check_password_hash
from . import db   ##means from __init__.py import db
from flask_login import login_user, login_required, logout_user, current_user
import datetime

auth = Blueprint('auth',__name__)

@auth.context_processor
def inject_user():
    return dict(current_user=current_user)

@auth.route('/login', methods=['GET', 'POST'])
def login():
    try:
        if request.method == 'POST':
            email = request.form.get('email')
            password = request.form.get('password')
            rememberMe = request.form.get('rememberMe')
            if rememberMe:      
                print('aaaaaaaaa')
            user = User.query.filter_by(email=email).first() #or Doctor.query.filter_by(email=email).first()
            # if user:
            #     if check_password_hash(user.password, password):
            #         flash('Logged in successfully!', category='success')
            #         login_user(user, remember=True)
            #         return redirect(url_for('views.home'))
            #     else:
            #         flash('Incorrect password, try again.', category='error')
            # else:
            #     flash('Email does not exist.', category='error')

    except Exception as e:
        flash('An error occurred during login', category='error')
        return redirect(url_for('auth.login'))

    return render_template("login.html")

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Logged out successfully!', category='success')
    return redirect(url_for('views.home'))

@auth.route('/register', methods =['GET','POST'])
def register():
    if request.method == 'POST':
        try:
            # Extract user input from the request
            name = request.form.get('name')
            email = request.form.get('email')
            dob = request.form.get('dob')
            gender = request.form.get('gender')
            password = request.form.get('password')
            accountType = request.form.get('accountType')
            print(accountType)
            dob = datetime.datetime.strptime(dob, '%Y-%m-%d').date()

            user = User.query.filter_by(email=email).first() #or Doctor.query.filter_by(email=email).first()
            print(user)
            if user:
                flash('Email already exists.', category='error')
            else:
                # Add user to database
                # if accountType == 'doctor':
                #     new_doctor = Doctor(name=name, email=email,dob=dob,gender=gender,password=generate_password_hash(
                #     password, method='sha256'))
                #     db.session.add(new_doctor)
                #     db.session.commit()
                #     flash('Doctor account created!', 'success')
                #     return redirect(url_for('views.login'))  
                # else:
                    new_user = User(name=name,email=email,dob=dob,gender=gender, password=generate_password_hash(
                    password, method='sha256'))
                    db.session.add(new_user)
                    db.session.commit()
                    # login_user(new_user, remember=True)
                    flash('User account created!','success')
                    return redirect(url_for('views.login'))  
    
        except Exception as e:
            flash('An error occurred during registration', category='error')
            return redirect(url_for('auth.register'))

    return render_template('register.html')
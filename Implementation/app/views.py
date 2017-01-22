import os, datetime
from flask import render_template, url_for, json, request, redirect, flash, jsonify
from app import app, db, login_manager, csrf
from .forms import LoginForm, SignUpForm
from .models import User
from flask_login import login_user, logout_user, current_user, login_required
from sqlalchemy import exc, exists

@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def index():
    print(db)
    page = "Home"
    return render_template('index.html', page=page)

@app.route('/login', methods=['GET', 'POST'])
def login():
    page = "Login"
    loginForm = LoginForm()

    if loginForm.submit.data and loginForm.validate_on_submit():
        flash('Successfully logged in as %s' % loginForm.user.username)
        login_user(loginForm.user, remember=True)
        return redirect(url_for("index"))

    return render_template('login.html', page=page, loginForm=loginForm)

@app.route('/sign-up', methods=['GET', 'POST'])
def signUp():
    page = "Sign Up"
    signUpForm = SignUpForm()

    if signUpForm.submit2.data and signUpForm.validate_on_submit():
        newUser = User(signUpForm.rusername.data.lower(), signUpForm.remail.data, signUpForm.rpassword.data, datetime.date.today())
        try:
            db.session.add(newUser)
            db.session.commit()
        except exc.IntegrityError as e:
            db.session.rollback()
            print('Error %s' % str(e))
            return redirect(url_for("index"))

        flash('Successfully created account %s. Please login.' % newUser.username)
        return redirect(url_for("index"))

    return render_template('sign-up.html', page=page, signUpForm=signUpForm)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Successfully logged out')
    return redirect(url_for('index'))

@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))

@app.route('/profile')
def profile():
    return redirect(url_for("index"))

@app.route('/binary')
def binary():
    page = "Binary"
    return render_template('binary.html', page=page)

@app.route('/binary-test', methods=['GET', 'POST'])
def binaryTest():
    page = "Binary Test"
    loginForm = LoginForm()
    signUpForm = SignUpForm()
    return render_template('binary-test.html', page=page, loginForm=loginForm, signUpForm=signUpForm)

@app.route('/logic_gates')
def logicGates():
    page = "Logic Gates"
    data = getJsonData("lg.json")
    return render_template('logic-gate.html', page=page, data=data)

@app.route('/algorithms')
def algorithms():
    page = "Algorithms"
    return render_template('algorithms.html', page=page);

@app.route('/loadLogic', methods=['POST'])
def loadLogic():
    name = request.get_json()
    print(name)
    logicGates = getJsonData("lg.json")
    print(logicGates)
    data = logicGates
    return render_template('test.html', data=data)

def getJsonData(filename):
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, "static/data", filename)
    data = json.load(open(json_url))
    return data

@app.route('/validateUsername', methods=['POST'])
def validateUsername():
    username = request.get_json()
    print(username['username'])
    user = User.query.filter_by(username=username['username']).first()
    if user == None:
        return jsonify(username='Not Taken')
    if user.username == username['username']:
        return jsonify(username='Username Taken')

@app.route('/validateEmail', methods=['POST'])
def validateEmail():
    email = request.get_json()
    print(email['email'])
    emailExists = User.query.filter_by(email=email['email']).first()
    if emailExists == None:
        return jsonify(email='Not Taken')
    if emailExists.email == email['email']:
        return jsonify(email='Email already in use')

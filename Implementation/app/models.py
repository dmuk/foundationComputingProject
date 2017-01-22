import datetime as dt
from app import db
from sqlalchemy.sql import func
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, unique=True)
    username = db.Column(db.String(80), unique=True, nullable="False")
    email = db.Column(db.String(120), unique=True, nullable="False")
    password = db.Column(db.String(255), nullable="False")
    created_at = db.Column(db.Date, nullable="False", server_default=func.now())
    scores = db.relationship('Score', backref='user')

    def __init__(self, username, email, password, createdAt):
        self.username = username
        self.email = email
        self.set_password(password)
        self.createdAt = createdAt

    def is_active(self):
        return True

    def get_id(self):
        return self.id

    def is_authenticated(self):
        return True

    def is_anomymous(self):
        return False

    def __repr__(self):
        return '<User %r>' % self.username

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

class Test(db.Model):
    __tablename__ = 'tests'
    id = db.Column(db.Integer, primary_key=True, autoincrement="True")
    name = db.Column(db.String(80), unique=True, nullable="False")
    scores = db.relationship('Score', backref='test')

    def __repr__(self):
        return '<Test %r>' % self.name

class Score(db.Model):
    __tablename__ = 'scores'
    id = db.Column(db.Integer, primary_key=True, autoincrement="True")
    score = db.Column(db.Integer, nullable="False")
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    test_id = db.Column(db.Integer, db.ForeignKey('tests.id'))

    def __repr__(self):
        return '<Score %r>' % self.score

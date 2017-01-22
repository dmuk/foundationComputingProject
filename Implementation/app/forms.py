from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, PasswordField, SubmitField, validators
from wtforms.validators import DataRequired, Length, Email, EqualTo
from .models import User
from sqlalchemy import exists
from sqlalchemy.orm import Session

class LoginForm(FlaskForm):
    lusername = StringField('Username', validators=[DataRequired()])
    lpassword = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Enter')

    def validate(self):
        rv = FlaskForm.validate(self)
        if not rv:
            return False

        user = User.query.filter_by(username=self.lusername.data.lower()).first()
        if user is None:
            self.lusername.errors.append('Invalid username')
            return False

        if not user.check_password(self.lpassword.data):
            self.lpassword.errors.append("Invalid password")
            return False

        self.user = user
        return True

class SignUpForm(FlaskForm):
    rusername = StringField('Username', validators=[DataRequired()])
    remail = StringField('Email', validators=[
    DataRequired('Please provide a valid email address'),
    Length(min=6, message='Email must be at least 6 characters long'),
    Email(message=('That is not a valid email address.'))])
    rpassword = PasswordField('Password', validators=[DataRequired(),
    Length(min=6, message='Password must be at least 6 characters long'),
    EqualTo('rconfirmpass', message=('Passwords do not match'))])
    rconfirmpass = PasswordField('Confirm Password')
    submit2 = SubmitField('Create an account')

    def validate(self):
        rv = FlaskForm.validate(self)
        if not rv:
            return False

        user = User.query.filter_by(username=self.rusername.data).first()
        emailExists = User.query.filter_by(email=self.remail.data).first()
        if user:
            self.rusername.errors.append('Username taken')
            return False
        if emailExists:
            self.remail.errors.append('There is already an account with this email')
            return False

        return True

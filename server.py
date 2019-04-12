from flask import Flask, render_template, request, redirect, url_for, session, escape

import password
import data_handler
app = Flask(__name__)
app.secret_key = b'_7sfFSd5hgHd_?#i324'


@app.route('/')
def home_page():
    if 'user_name' in session:
        user_name = session['user_name']
    else:
        user_name = None
    return render_template('home.html', user_name=user_name)

@app.route('/registration', methods=['GET', 'POST'])
def registration():
    if 'user_name' in session:
        user_name = session['user_name']
    else:
        user_name = None
    if request.method == "POST":
        user_name = request.form.get('user_name')
        pass1 = request.form.get('pass1')
        pass2 = request.form.get('pass2')
        if pass1 == pass2:
            hashed_pass = password.hash_password(pass1)
            data_handler.register_a_new_user(user_name, hashed_pass)
            return redirect(url_for('home_page'))
        else:
            return render_template('registration.html', user_name=user_name)

    return render_template('registration.html', user_name=user_name)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'user_name' in session:
        user_name = session['user_name']
    else:
        user_name = None
    if request.method == "POST":
        user_name = request.form.get('user_name')
        pass1 = request.form.get('pass1')
        hashed_pass_from_database = data_handler.get_user_info_to_login(user_name)

        if hashed_pass_from_database:
            verification = password.verify_password(pass1, hashed_pass_from_database)

            if verification:
                session['user_name'] = request.form.get('user_name')
                return redirect(url_for('home_page'))
            else:
                text = "False user name or password. Try again!"
                return render_template('login.html', text=text, user_name=user_name)

        text = "False user name or password. Try again!"

        return render_template('login.html', text=text, user_name=user_name)

    return render_template('login.html', user_name=user_name)


@app.route('/logout')
def logout():
    session.pop('user_name', None)
    return redirect(url_for('home_page'))

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True,
    )


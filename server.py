from flask import Flask, render_template, request, redirect, url_for, session, escape

app = Flask(__name__)
app.secret_key = b'_7sfFSd5hgHd_?#i324'


@app.route('/')
def home_page():
    return render_template('home.html')


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True,
    )


from flask import Flask, render_template, url_for   

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/contacto")
def contacto():
    return "<h1>Contacto</h1>"

if __name__ == "__main__":
    app.run(debug=True)
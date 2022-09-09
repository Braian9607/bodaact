from flask import Flask, render_template, url_for, request

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/savetodate")
def save():
    return render_template("gallery.html")

@app.route("/confirmacion")
def contacto():
    return render_template("contact.html")

@app.route("/confirmacion/buscar", methods=['POST'])
def buscar_inv():
    nombreUser  = request.form['nombreUser']
    return "<h1>Bienvenido " + nombreUser + "</h1>"


if __name__ == "__main__":
    app.run(debug=True)
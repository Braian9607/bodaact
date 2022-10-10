#from mysql import Cursor
from flask import Flask, render_template, url_for, request
from flask_mysqldb import MySQL
import mysql.connector

# conexion = mysql.connector.connect(user='root', 
#     password = '1234',
#     host='localhost',
#     database='boda',
#     port = '3306')
#print(conexion)
app = Flask(__name__, template_folder='templates', static_folder='static')
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1234'
app.config['MYSQL_DB'] = 'boda'
mysql = MySQL(app)

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
    #nombreUser  = request.form['nombreUser']
    codigo = request.form['codigo']
    cur = mysql.connection.cursor()
    #cur.execute('SELECT * FROM usuario WHERE nombre = %s', [nombreUser])
    #mysql.connection.commit()
    cur.execute('''SELECT u.familia
        FROM usuario u
        left join invitados i on u.clave_inv = i.clave_inv 
        WHERE u.clave_inv = %s''', [codigo])
    data = cur.fetchall()
    cur.close()
    print(data[0])
    return render_template("contact.html") 


if __name__ == "__main__":
    app.run(debug=True)
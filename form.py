#from mysql import Cursor
from pickle import APPEND
from tkinter.font import families
from flask import Flask, render_template, url_for, request, jsonify
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
    print(codigo)
   
    ## Buscar familia 
    cur = mysql.connection.cursor()
    cur.execute('''SELECT u.familia
        FROM usuario u
        WHERE u.clave_inv = %s''', [codigo])
    data_fam = cur.fetchall()
    cur.close()
    familia = data_fam[0][0]
    print('familia',familia)

    ## Buscar Invitados 
    cur = mysql.connection.cursor()
    cur.execute('''SELECT i.nombre
        FROM usuario u
        left join invitados i on u.clave_inv = i.clave_inv 
        WHERE u.clave_inv = %s''', [codigo])
    data_inv = cur.fetchall()
    cur.close()
    invi = []
    for i in range(len(data_inv)):
        for j in range(len(data_inv[i])):
            invi.append(data_inv[i][j])
    invitados = sorted(invi)
    print('Invitados',invitados)

    ## Número de invitados adultos
    cur = mysql.connection.cursor()
    cur.execute('''SELECT count(distinct i.nombre)
        FROM usuario u
        left join invitados i on u.clave_inv = i.clave_inv 
        WHERE u.clave_inv = %s and i.tipo_persona = "Adulto" ''', [codigo] )
    cantidad_a = cur.fetchall()
    cur.close()
    print(cantidad_a[0][0])
    
   ## Número de invitados niños
    cur = mysql.connection.cursor()
    cur.execute('''SELECT count(distinct i.nombre)
        FROM usuario u
        left join invitados i on u.clave_inv = i.clave_inv 
        WHERE u.clave_inv = %s and i.tipo_persona = "Niño" ''', [codigo] )
    cantidad_n = cur.fetchall()
    cur.close()
    
    print(cantidad_n[0][0])

    return jsonify({'result' : 'success', 'familia' : familia, 'invitados' : invitados,
        'cantidad_a': cantidad_a, 'cantidad_n': cantidad_n }) 


if __name__ == "__main__":
    app.run(debug=True)
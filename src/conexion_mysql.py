import mysql.connector

conexion = mysql.connector.connect(user='root',
          password = '1234',
          host='localhost',
          database='boda',
          port='3306')

print(conexion)
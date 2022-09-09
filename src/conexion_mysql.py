import mysql.connector

conexion = mysql.connector.connect(user='root', password='root',
                                    host='127.0.0.1',
                                    database='  BODA',
                                    port='3306')
print(conexion)
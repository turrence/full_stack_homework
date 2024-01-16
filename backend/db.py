import mysql.connector
from mysql.connector import Error

try:
   connection = mysql.connector.connect(host='localhost',
        port='3306',
        database='machina_labs',
        user='root',
        password='mysecretpassword')

   if connection.is_connected():
       db_Info = connection.get_server_info()
       print("Connected to MySQL Server version ", db_Info)
       cursor = connection.cursor()
       cursor.execute("select database();")
       record = cursor.fetchone()
       print("You're connected to database: ", record)
       cursor.execute("SHOW TABLES;")
       record = cursor.fetchall()
       print("tables: ", record)

except Error as e:
   print("Error while connecting to MySQL", e)
finally:
   if connection.is_connected():
       cursor.close()
       connection.close()
       print("MySQL connection is closed")

class DB:
    def __init__(self):
        self.connection = mysql.connector.connect(host='localhost',
            port='3306',
            database='machina_labs',
            user='root',
            password='mysecretpassword'
        )
        
    def __del__(self):
        self.connection.close()

    def select(self):
        cursor = self.connection.execute(query)
        ...
        self.connection.commit()
import mysql.connector
from mysql.connector import Error

db_config = {
    'host':'localhost',
    'port':'3306',
    'database':'machina_labs',
    'user':'root',
    'password':'mysecretpassword'
}

class DB:
    def __init__(self, config: 'dict[str, str]'):
        self.config = config
    
    def connect(self):
        return mysql.connector.connect(**self.config)
        
class DAO(DB):

    def select(self, query: str):
        with self.connect() as conn:
            cursor = conn.cursor()
            cursor.execute(query)
            ret = cursor.fetchall()
            cursor.close()
            return ret

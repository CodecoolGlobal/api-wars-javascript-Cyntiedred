import connection

@connection.connection_handler
def register_a_new_user(cursor, user_name, password):
    cursor.execute("""
                    INSERT INTO users (username, password)
                    VALUES (%(user_name)s, %(password)s)
                    """,
                   {
                       "user_name": user_name,
                       "password": password,
                   })


@connection.connection_handler
def get_user_info_to_login(cursor, user_name):
    cursor.execute("""
                    SELECT password FROM users
                    WHERE username ILIKE %(user_name)s;
                    """,
                   {
                       "user_name": user_name,
                   })
    try:
        password = cursor.fetchone()['password']
        return password
    except:
        return False
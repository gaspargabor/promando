import persistence
import database_common


@database_common
def get_card_status(cursor, status_id):
    cursor.execute("""
                    SELECT """)

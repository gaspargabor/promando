import persistence
import database_common


@database_common.connection_handler
def get_card_status(cursor, status_id):
    cursor.execute("""
                    SELECT id FROM statuses
                    WHERE id = %(status_id)s""",
                   {'status_id': status_id})
    status_id = cursor.fetchone()
    return status_id

@database_common.connection_handler
def get_boards(cursor):
    cursor.execute("""
                    SELECT COUNT(statuses.title), statuses.board_id, b.id, b.title from statuses
                    inner join board b on statuses.board_id = b.id
                    GROUP BY board_id, b.id
                    """)
    boards = cursor.fetchall()
    return boards

@database_common.connection_handler
def get_cards_for_board(cursor, board_id):
    cursor.execute("""
                    SELECT cards.id as cards_id, cards.title as cards_title, cards.board_id, cards.status_id, b.id, b.title as board_title FROM cards
                    inner join board b on cards.board_id = b.id
                    WHERE b.id = %(board_id)s
                    """,
                   {'board_id': board_id}
                   )
    cards = cursor.fetchall()
    return cards


@database_common.connection_handler
def get_cards(cursor):
    cursor.execute("""
                    SELECT * FROM cards
                    """)
    cards = cursor.fetchall()
    return cards


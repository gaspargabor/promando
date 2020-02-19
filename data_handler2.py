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
                    full join board b on statuses.board_id = b.id
                    GROUP BY board_id, b.id
                    """)
    boards = cursor.fetchall()
    return boards

@database_common.connection_handler
def get_statuses(cursor, board_id):

    cursor.execute("""
                    SELECT * FROM statuses
                    WHERE board_id= %(board_id)s
                        """, {'board_id': board_id})
    statuses = cursor.fetchall()
    return statuses

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


@database_common.connection_handler
def add_new_board(cursor):
    cursor.execute("""
                    INSERT INTO board(title)
                    VALUES ('new_board')
                    """)


@database_common.connection_handler
def get_newest_board(cursor):
    cursor.execute("""
                    SELECT * FROM board
                    ORDER BY id DESC
                    LIMIT 1
                    """)
    last_board = cursor.fetchone()
    return last_board


@database_common.connection_handler
def add_default_stat(cursor):
    board = get_newest_board()
    default_title = "New stat"
    print(board)
    print(default_title)
    for i in range(1, 5):
        stat_id = str(board['id']) + str(i)
        print(stat_id)
        cursor.execute("""
                        INSERT INTO statuses(id, board_id, title)
                         VALUES (%(stat_id)s, %(board_id)s, %(default_title)s )""",
                       {'stat_id': stat_id, 'board_id': board['id'], 'default_title': default_title})

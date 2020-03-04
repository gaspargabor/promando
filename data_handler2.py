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
                    ORDER BY b.id ASC
                    """)
    boards = cursor.fetchall()
    return boards

@database_common.connection_handler
def get_statuses(cursor, board_id):

    cursor.execute("""
                    SELECT * FROM statuses
                    WHERE board_id= %(board_id)s
                    Order by id
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
def get_newest_board(cursor):
    cursor.execute("""
                    SELECT * FROM board
                    ORDER BY id DESC
                    LIMIT 1
                    """)
    last_board = cursor.fetchone()
    return last_board

@database_common.connection_handler
def add_new_board(cursor):
    cursor.execute("""
                    INSERT INTO board(title)
                    VALUES (%(new_board)s)
                    """, {'new_board': 'new_board'})
    board = get_newest_board()
    if not board:
        new_board = 'Board ' + '1'
    else:
        new_board = 'Board ' + str(board['id'])
    cursor.execute("""
                    UPDATE board
                    SET title = %(new_board)s
                    WHERE board.id=%(board_id)s;
                    """, {'new_board': new_board, 'board_id': board['id']})

@database_common.connection_handler
def delete_card_by_boardid(cursor, board_id):
    cursor.execute("""
                    DELETE FROM cards
                    WHERE board_id = %(board_id)s""",
                   {'board_id': board_id})

@database_common.connection_handler
def delete_status_by_boardid(cursor, board_id):
    cursor.execute("""
                    DELETE FROM statuses
                    WHERE board_id = %(board_id)s""",
                   {'board_id': board_id})

@database_common.connection_handler
def delete_board(cursor, board_id):
    cursor.execute("""
                    DELETE FROM board
                    WHERE id = %(board_id)s""",
                   {'board_id': board_id})


@database_common.connection_handler
def add_default_stat(cursor):
    board = get_newest_board()
    statuses = ['new', 'in progress', 'testing', 'done']
    for i in range(1, 5):
        stat_id = str(board['id']) + str(i)
        cursor.execute("""
                        INSERT INTO statuses(id, board_id, title)
                         VALUES (%(stat_id)s, %(board_id)s, %(default_title)s )""",
                       {'stat_id': stat_id, 'board_id': board['id'], 'default_title': statuses[i-1]})


@database_common.connection_handler
def get_newest_card(cursor):
    cursor.execute("""
                    SELECT * FROM cards
                    ORDER BY id DESC
                    LIMIT 1
                    """)
    last_card = cursor.fetchone()
    return last_card


@database_common.connection_handler
def add_new_card(cursor, data):
    cursor.execute("""
                    INSERT INTO cards(board_id, title, status_id)
                     VALUES (%(board_id)s, %(title)s, %(status_id)s)""",
                   {'board_id': data['board_id'], 'title': data['title'], 'status_id': data['status_id']})
    return get_newest_card()


@database_common.connection_handler
def update_title(cursor, board_id, new_title):
    cursor.execute("""
                    UPDATE board
                    SET title = %(new_title)s
                    WHERE id = %(board_id)s
                     """,
                   {'board_id': board_id, 'new_title': new_title})

@database_common.connection_handler
def update_column_title(cursor, status_id, new_title):

    cursor.execute("""
                    UPDATE statuses
                    SET title = %(new_title)s
                    WHERE id = %(status_id)s
                     """,
                   {'status_id': status_id, 'new_title': new_title})







@database_common.connection_handler
def update_card_title(cursor, card_id, new_title):
    cursor.execute("""
                    UPDATE cards
                    SET title = %(new_title)s
                    WHERE id = %(card_id)s
                     """,
                   {'card_id': card_id, 'new_title': new_title})


@database_common.connection_handler
def update_card_position(cursor, card_id, new_col):
    cursor.execute("""
                    UPDATE cards
                    SET status_id = %(new_col)s
                    WHERE id = %(card_id)s
                     """,
                   {'card_id': card_id, 'new_col': new_col})

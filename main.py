from flask import Flask, render_template, url_for, request, redirect
from util import json_response

import data_handler
import data_handler2

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler2.get_boards()


@app.route("/get-statuses/<int:board_id>")
@json_response
def get_statuses(board_id):
    """
    All the boards
    """
    print('in get stat server')
    print(board_id)

    return data_handler2.get_statuses(board_id)


@app.route("/get-cards")
@json_response
def get_cards_for_board():
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler2.get_cards()

@app.route("/get-cards")
@json_response
def get_cards():
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler2.get_cards()



@app.route("/add-board", methods=['GET', 'POST'])
@json_response
def add_board():
    if request.method == 'POST':
        data_handler2.add_new_board()
        data_handler2.add_default_stat()
        return data_handler2.get_newest_board()
    else:
        return 'server get'

@app.route("/delete-board/<board_id>", methods=['GET', 'POST'])
@json_response
def delete_board(board_id):
    if request.method == 'POST':
        data_handler2.delete_card_by_boardid(board_id)
        data_handler2.delete_status_by_boardid(board_id)
        data_handler2.delete_board(board_id)


def main():
    app.run(debug=True,
            host='0.0.0.0',
            port=5002)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()

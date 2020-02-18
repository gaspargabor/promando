from flask import Flask, render_template, url_for
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


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler2.get_cards_for_board(board_id)

@app.route("/get-cards")
@json_response
def get_cards():
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler2.get_cards()



def main():
    app.run(debug=True,
            host='0.0.0.0',
            port=6070)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()

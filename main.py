from flask import Flask, render_template, url_for, request, redirect
from util import json_response

import data_handler
import data_handler2

app = Flask(__name__)


@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        print('ittvagyok POG')
    else:
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


@app.route("/add-board", methods=['GET', 'POST'])
@json_response
def add_board():
    print("in add-board")
    new = data_handler2.add_new_board()
    print(new)
    return new

def main():
    app.run(debug=True,
            host='0.0.0.0')

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()

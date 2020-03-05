import socketio
from flask import Flask, jsonify, render_template, url_for, request, redirect
from util import json_response
from flask_socketio import SocketIO, send, emit
import json
import data_handler2

app = Flask(__name__)
socket = SocketIO(app, async_mode=None)


@socket.on('start drag')
def handle_my_custom_event(data):
    print('in start drag')
    print(data)


@socket.on('drop it')
def handle_my_drop(data):
    print('in drop eet')
    print(data)


@socket.on('drop append')
def handle_my_drop(data):
    print('in drop append')
    print(data)
    emit('all drop it', data, broadcast=True)


@socket.on('new card trigger')
def handle_my_new_card(json):
    print('new card in da server?')
    print(json)
    # emit('new card response', json, broadcast=True)



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


@app.route("/update-title/<board_id>", methods=['GET', 'POST'])
@json_response
def update_title(board_id):
    if request.method == "POST":
        req = request.get_json()
        data_handler2.update_title(board_id, req)
        updated_board = {'id': board_id, 'title': req}
        socket.emit('edit board title!', updated_board, broadcast=True)
        return req


@app.route("/update-column-title/<status_id>", methods=['GET', 'POST'])
@json_response
def update_column_title(status_id):
    if request.method == "POST":
        req = request.get_json()
        data_handler2.update_column_title(status_id, req)
        updated_col = {'id': status_id, 'title': req}
        socket.emit('edit col title!', updated_col, broadcast=True)
        return req


@app.route("/update-card-title/<card_id>", methods=['GET', 'POST'])
@json_response
def update_card_title(card_id):
    if request.method == "POST":
        req = request.get_json()
        data_handler2.update_card_title(card_id, req)
        updated_card = {'id': card_id, 'title': req}
        socket.emit('edit title!', updated_card, broadcast=True)
        return req


@app.route("/add-board", methods=['GET', 'POST'])
@json_response
def add_board():
    if request.method == 'POST':
        data_handler2.add_new_board()
        data_handler2.add_default_stat()
        newest_board = data_handler2.get_newest_board()
        socket.emit('new board', newest_board, broadcast=True)
        return newest_board
    else:
        return 'server get'


@app.route("/delete-board/<board_id>", methods=['GET', 'POST'])
@json_response
def delete_board(board_id):
    if request.method == 'POST':
        data_handler2.delete_card_by_boardid(board_id)
        data_handler2.delete_status_by_boardid(board_id)
        data_handler2.delete_board(board_id)
        socket.emit('new board', broadcast=True)

@app.route("/delete-card/<card_id>", methods=['GET', 'POST'])
@json_response
def delete_card(card_id):
    if request.method =='POST':
        data_handler2.delete_card_by_cardid(card_id)

@app.route('/add-card', methods=['GET', 'POST'])
@json_response
def add_new_card():
    if request.method == 'POST':
        data = request.get_json()
        new_card = data_handler2.add_new_card(data)
        print(new_card)
        socket.emit('new card', new_card, broadcast=True)
        return new_card


@app.route('/save-drop', methods=['GET', 'POST'])
@json_response
def save_drop():
    if request.method == 'POST':
        data = request.get_json()
        data_handler2.update_card_position(data['card'], data['colId'])
        socket.emit('new drop', data, broadcast=True)
        return "kk"


@app.route('/create-column-id/<board_id>')
@json_response
def create_new_column_id(board_id):
    return data_handler2.get_col_num(board_id)


@app.route('/create-column', methods=['GET', 'POST'])
@json_response
def create_new_column():
    if request.method == 'POST':
        data = request.get_json()
        return data_handler2.create_new_column(data)


@app.route('/delete-column/<status_id>', methods=['GET', 'POST'])
@json_response
def delete_columns(status_id):
    if request.method == 'POST':
        print('in server')
        data_handler2.delete_column_by_statusid(status_id)

def main():
    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    socket.run(app, host='10.44.4.84')
    main()

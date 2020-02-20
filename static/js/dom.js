// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
        dom.loadBoards();
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        for(let board of boards){
            dom.showBoard(board);
        }
        dom.loadCards();
    },


    showBoard: function (board) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        const createBoard = function(title){
            const boardTemplate = document.querySelector('#board-template');
            const clone = document.importNode(boardTemplate.content, true);
            clone.querySelector('.board-title').textContent = title;
            clone.querySelector('.board').setAttribute('id', 'board' + board.id);
            clone.querySelector('.board-columns').setAttribute('id', 'columns' + board.id);
            clone.querySelector('.delete-board').setAttribute('id', 'delete'+ board.id);
            clone.querySelector('#delete' + board.id).addEventListener('click', function () {
                dataHandler.deleteBoard(board.id, function () {
                dom.deleteBoard(board.id);
                })
            });
            clone.querySelector('.board-add').setAttribute('id', 'add-card' + board.id);
            clone.querySelector('#add-card' + board.id).addEventListener('click', function () {
                dom.addCard(board.id);
            });
            return clone;
        };
        const singleBoard = createBoard(board.title);
        document.querySelector('#boards').appendChild(singleBoard);
        console.log('calling load STATUSES from show board');
        dom.loadStatuses(board.id);
        return "done";
    },

    loadStatuses: function(board_id) {
        console.log("load statuses");
        dataHandler.getStatuses(board_id, function (statuses) {

            dom.showStatuses(statuses);
        });
    },

    showStatuses: function(statuses){
        console.log("show statuses");

        for (let status of statuses) {
            const createColumn = function(title){
                const columnTemplate = document.querySelector('#column-template');
                const clone = document.importNode(columnTemplate.content, true);
                clone.querySelector('.board-column-title').textContent = title;
                clone.querySelector('.board-column').setAttribute('id', 'board-col' + status.id);
                clone.querySelector('.board-column-content').setAttribute('id', 'board-col-cont' +status.id);
                return clone;
            };
            const singleCol = createColumn(status.title);
            document.querySelector('#columns' + status.board_id).appendChild(singleCol);

        }


    },

    loadCards: function () {
        console.log("load cardS");
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(function(cards){
            if (cards) {
                dom.showCards(cards);

            }

        });
    },
    showCards: function (cards) {
        console.log('show cardS');
        // shows the cards of a board
        // it adds necessary event listeners also
        for (let card of cards) {
            const createCard = function () {
                const cardTemplate = document.querySelector('#card-template');
                const clone = document.importNode(cardTemplate.content, true);
                clone.querySelector('.card-title').textContent = card.title;
                return clone;
            };
            const singleCard = createCard();
            console.log('#board-col-cont' + card.board_id + card.status_id);
            document.querySelector('#board-col-cont' + card.board_id + card.status_id).appendChild(singleCard);
        }
    },
    // here comes more features

    addBoard: function () {
        let button = document.getElementById('add-board');
        button.addEventListener('click', function () {
            dataHandler.createNewBoard(function (new_board) {
            dom.showBoard(new_board);

            })
        })
    },

    deleteBoard: function (board_id) {
        document.querySelector('#board'+ board_id).remove();

    },

    addCard: function (board_id) {
        console.log('add card');
        let status_id = 1;
        let data = {board_id: board_id, title: 'new card', status_id: status_id};
        dataHandler.createNewCard(data, function (card) {
            dom.showCard(card);
        })
    },
    
    showCard: function (card) {
        console.log('show card');
        const createCard = function() {
            const cardTemplate = document.querySelector('#card-template');
            const clone = document.importNode(cardTemplate.content, true);
            clone.querySelector('.card-title').textContent = card.title;
            return clone;
        };
        const singleCol = createCard();
        document.querySelector('#board-col-cont' + card.board_id + card.status_id).appendChild(singleCol);
    }

};

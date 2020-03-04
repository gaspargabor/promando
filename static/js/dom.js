// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";


export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
        document.querySelector('#boards').textContent = '';
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

            clone.querySelector('.board-title').setAttribute('id', 'board-title'+board.id);
            clone.querySelector('#board-title'+ board.id).addEventListener('click', function () {
                console.log('onclick')
            } );
            clone.querySelector('#board-title'+ board.id).addEventListener('blur',  function(){
                    let data = this.innerHTML;
                     if ( data ) {
                            dom.loadTitle(board.id, data);
                            dataHandler.updateTitle(board.id, data)
                        }
                       else {
                        dom.loadTitle(board.id, board.title);}


            }) ;
            clone.querySelector('.board').setAttribute('id', 'board' + board.id);
            clone.querySelector('.board-columns').setAttribute('id', 'columns' + board.id);
            /*clone.querySelector('.board-columns').setAttribute('id', 'board_columns' + board.id);*/
            let columns = clone.querySelector('#columns' + board.id);
            clone.querySelector('.board-toggle').setAttribute('id', 'toggle'+ board.id);
            let toggle = clone.querySelector('#toggle' + board.id)
            clone.querySelector('#toggle' + board.id).addEventListener('click', function () {

            let firstchild = toggle.firstChild
                if (columns.style.display === "none") {
                columns.style.display = "flex";
                firstchild.classList = "fas fa-chevron-up"
              } else {

                columns.style.display = "none";
                firstchild.classList = "fas fa-chevron-down"
              }

            });
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
        dom.loadStatuses(board.id);

        return "done";
    },

    loadStatuses: function(board_id) {
        dataHandler.getStatuses(board_id, function (statuses) {

            dom.showStatuses(statuses);
        });
    },

    showStatuses: function(statuses){

        for (let status of statuses) {
            const createColumn = function(title){
                const columnTemplate = document.querySelector('#column-template');
                const clone = document.importNode(columnTemplate.content, true);
                clone.querySelector('.board-column-title').textContent = title;
                clone.querySelector('.board-column').setAttribute('id', 'board-col' + status.id);
                clone.querySelector('.board-column-content').setAttribute('id', 'board-col-cont' +status.id);
                clone.querySelector('.board-column-title').setAttribute('id', 'board-column-title'+status.id);
                clone.querySelector('#board-column-title'+ status.id).addEventListener('click', function () {
                    console.log('onclick');
                } );
                clone.querySelector('#board-column-title'+ status.id).addEventListener('blur',  function(){
                        let data = this.innerHTML;
                        if ( data ) {
                            console.log('in stat fiszem if');
                            dom.loadStatusTitle(status.id, data);
                            dataHandler.updateColumnTitle(status.id, data)
                        }
                       else {
                        dom.loadStatusTitle(status.id, status.title);}
                }) ;
                return clone;
            };
            const singleCol = createColumn(status.title);
            document.querySelector('#columns' + status.board_id).appendChild(singleCol);

        }

        },

    loadCards: function () {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(function(cards){
            if (cards) {
                dom.showCards(cards);

            }

        });
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        for (let card of cards) {
            const createCard = function () {
                const cardTemplate = document.querySelector('#card-template');
                const clone = document.importNode(cardTemplate.content, true);
                clone.querySelector('.card-title').textContent = card.title;
            clone.querySelector('.card-title').setAttribute('id', 'card-title'+card.id);
            clone.querySelector('#card-title'+ card.id).addEventListener('click', function () {
            } );
            clone.querySelector('#card-title'+ card.id).addEventListener('blur',  function(){
                    let data = this.innerHTML;
                        if ( data ) {
                            dom.loadCardTitle(card.id, data);
                            dataHandler.updateCardTitle(card.id, data)
                        }
                       else {
                        dom.loadCardTitle(card.id, card.title);}

            }) ;
            clone.querySelector('.delete-card').setAttribute('id', 'delete'+ card.id);
            clone.querySelector('#delete' + card.id).addEventListener('click', function () {
                dataHandler.deleteCard(card.id, function () {
                dom.deleteCard(card.id);
                })
            });
            clone.querySelector('.card').setAttribute('id', 'card' + card.id);
                return clone;
            };
            const singleCard = createCard();
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

    deleteCard: function(card_id) {
        document.querySelector('#card' + card_id).remove()
    },

    addCard: function (board_id) {
        let status_id = 1;
        let data = {board_id: board_id, title: 'new card', status_id: status_id};
        dataHandler.createNewCard(data, function (card) {
            dom.showCard(card);
        })
    },

    showCard: function (card) {
        const createCard = function() {
            const cardTemplate = document.querySelector('#card-template');
            const clone = document.importNode(cardTemplate.content, true);
            clone.querySelector('.card-title').textContent = card.title;
            clone.querySelector('.card-title').setAttribute('id', 'card-title'+card.id);
            clone.querySelector('#card-title'+ card.id).addEventListener('click', function () {
            } );
            clone.querySelector('#card-title'+ card.id).addEventListener('blur',  function(){
                    let data = this.innerHTML;
                        if ( data ) {
                            dom.loadCardTitle(card.id, data);
                            dataHandler.updateCardTitle(card.id, data)
                        }
                       else {
                        dom.loadCardTitle(card.id, card.title);}

            }) ;
            clone.querySelector('.delete-card').setAttribute('id', 'delete'+ card.id);
            clone.querySelector('#delete' + card.id).addEventListener('click', function () {
                dataHandler.deleteCard(card.id, function () {
                dom.deleteCard(card.id);
                })
            });
            clone.querySelector('.card').setAttribute('id', 'card' + card.id);
            return clone;
        };
        const singleCol = createCard();
        document.querySelector('#board-col-cont' + card.board_id + card.status_id).appendChild(singleCol);
    },
        loadTitle: function (board_id, board) {
                return document.querySelector('#board-title' + board_id).textContent = board;
        },

        loadStatusTitle: function (status_id, status) {
            return document.querySelector('#board-column-title' + status_id).textContent = status;

        },

        loadCardTitle: function (card_id, card) {
            return document.querySelector('#card-title'+ card_id).textContent = card;

        }

};

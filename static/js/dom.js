// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
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
            const createBoard = function(title){
            const boardTemplate = document.querySelector('#board-template');
            const clone = document.importNode(boardTemplate.content, true);
            clone.querySelector('.board-title').textContent = title;
            clone.querySelector('.board').setAttribute('id', 'board' + board.id);
            clone.querySelector('.board-columns').setAttribute('id', 'columns' + board.id);
            return clone;
            };
            const singleBoard = createBoard(board.title);
            console.log(board)
            document.querySelector('#boards').appendChild(singleBoard);
                for (let i=1; i < board.count + 1; i++) {
                    const createColumn = function(title){
                    const columnTemplate = document.querySelector('#column-template');
                    const clone = document.importNode(columnTemplate.content, true);
                    clone.querySelector('.board-column-title').textContent = title;
                    clone.querySelector('.board-column').setAttribute('id', 'board-col' + board.id+ i);
                    clone.querySelector('.board-column-content').setAttribute('id', 'board-col-cont' +board.id + i);

                    return clone;
                    };
                    const singleCol = createColumn('Column title');
                    document.querySelector('#columns' + board.id).appendChild(singleCol);

                    }

                }
        dom.loadCards();
        },



        loadCards: function () {
            // retrieves cards and makes showCards called

            dataHandler.getCards(function(cards){
            dom.showCards(cards);
        });
        },
        showCards: function (cards) {
            // shows the cards of a board
            // it adds necessary event listeners also
            console.log(cards);

            for (let card of cards) {
            const createCard = function(title){
            const cardTemplate = document.querySelector('#card-template');
            const clone = document.importNode(cardTemplate.content, true);
            clone.querySelector('.card-title').textContent = title;
            return clone;
            };
            const singleCol = createCard(card.title);
            document.querySelector('#board-col-cont' + card.status_id).appendChild(singleCol);}
        },
        // here comes more features
};

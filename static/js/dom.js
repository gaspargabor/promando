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
            return clone;
            };
            const singleBoard = createBoard(board.title);
            document.querySelector('#boards').appendChild(singleBoard);}

        for (let i=0; i<4; i++) {

            const createColumn = function(title){
            const columnTemplate = document.querySelector('#column-template');
            const clone = document.importNode(columnTemplate.content, true);
            clone.querySelector('.board-column-title').textContent = title;
            return clone;
            };
            const singleCol = createColumn('Column title');
            document.querySelector('.board-columns').appendChild(singleCol);}
            dom.showCards('hjelo');
        },



        loadCards: function (boardId) {
            // retrieves cards and makes showCards called
        },
        showCards: function (cards) {
            // shows the cards of a board
            // it adds necessary event listeners also

            const createCard = function(title){
            const cardTemplate = document.querySelector('#card-template');
            const clone = document.importNode(cardTemplate.content, true);
            clone.querySelector('.card-title').textContent = title;
            return clone;
            };
            const singleCol = createCard('Card title');
            document.querySelector('.board-column-content').appendChild(singleCol);
        },
        // here comes more features
};

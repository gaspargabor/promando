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
            document.querySelector('#boards').appendChild(singleBoard);
                for (let i=0; i<4; i++) {
                    const createColumn = function(title){
                    const columnTemplate = document.querySelector('#column-template');
                    const clone = document.importNode(columnTemplate.content, true);
                    clone.querySelector('.board-column-title').textContent = title;
                    clone.querySelector('.board-column').setAttribute('id', 'board-col' + i);
                    clone.querySelector('.board-column-content').setAttribute('id', 'board-col-cont' + i);
                    return clone;
                    };
                    const singleCol = createColumn('Column title');
                    document.querySelector('#columns' + board.id).appendChild(singleCol);
                    console.log(i);
                    dom.loadCards(board.id, i);}
                }

        },



        loadCards: function (boardId, statId) {
            // retrieves cards and makes showCards called
            console.log('loadcard');
            console.log(statId);
            dataHandler.getCardsByBoardId(boardId,function(cards){
                console.log('bedore show card');
            console.log(statId);
            dom.showCards(cards, statId);
        });
        },
        showCards: function (cards, statId) {
            // shows the cards of a board
            // it adds necessary event listeners also
            console.log(statId);
            for (let card of cards) {
            const createCard = function(title){
            const cardTemplate = document.querySelector('#card-template');
            const clone = document.importNode(cardTemplate.content, true);
            clone.querySelector('.card-title').textContent = title;
            return clone;
            };
            const singleCol = createCard('whut dis shiat');
            console.log('.board-col-cont' + statId);
            console.log(document.querySelector('#board-col-cont' + statId));
            document.querySelector('#board-col-cont' + statId).appendChild(singleCol);}
        },
        // here comes more features
    addBoard: function () {
        let button = document.getElementById('add-board');
        button.addEventListener('click', function () {
            console.log("yayayaya");
            dataHandler.createNewBoard(function () {
                console.log("im createboard callback func.")
            })
        })
    }

};

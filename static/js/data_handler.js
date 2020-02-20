// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
export let dataHandler = {
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _api_get: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
        .then(response => response.json())  // parse the response as JSON
        .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },
    _api_post: function (url, callback) {
        // it is not called from outside
        // sends the data to the API, and calls callback function

        fetch(url, {
          method: "POST",
          headers: { 'Accept': 'application/json',
              'Content-Type': 'application/json' },
          body: JSON.stringify({ data: 'data' })
        })
          .then(response => response.json())
            .then(data => callback(data))

            ;


    },
    _api_post2: function (url, data, callback) {
        // it is not called from outside
        // sends the data to the API, and calls callback function

        fetch(url, {
          method: "POST",
          headers: { 'Accept': 'application/json',
              'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
            .then(data => callback(data))

            ;


    },

    init: function () {
    },
    getBoards: function (callback) {
        // the boards are retrieved and then the callback function is called with the boards

        // Here we use an arrow function to keep the value of 'this' on dataHandler.
        //    if we would use function(){...} here, the value of 'this' would change.
        this._api_get('/get-boards', (response) => {
            this._data = response;

            callback(response);
        });
    },
    getBoard: function (boardId, callback) {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: function (board_id, callback) {
        // the statuses are retrieved and then the callback function is called with the statuses
        this._api_get('/get-statuses/' + board_id, (response) => {
            this._data = response;
            callback(response);
        });

    },
    getStatus: function (statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: function (callback) {
        // the cards are retrieved and then the callback function is called with the cards
                this._api_get('/get-cards', (response) => {

            this._data = response;
            callback(response);
        });
    },
    getCard: function (cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: function (callback) {
        // creates new board, saves it and calls the callback function with its data
                this._api_post('/add-board', callback)


    },
    createNewCard: function (cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
    },
    // here comes more features
    deleteBoard: function (boardId, callback) {
        this._api_post('/delete-board/' + boardId, response => {
            this._data = response;
            callback(response)
        })
    },

    updateTitle: function(boardId,data, callback) {
        this._api_post2('/update-title/' + boardId, data, response => {
            this._data = response;
            console.log('in apipost2');
            callback(response)
        })
    },

    updateColumnTitle: function(statusId,data, callback) {
        this._api_post2('/update-column-title/' + statusId, data, response => {
            this._data = response;
            callback(response)
        })
    },

    updateCardTitle: function(cardId,data, callback) {
        this._api_post2('/update-card-title/' + cardId, data, response => {
            this._data = response;
            callback(response)
        })
    }


};

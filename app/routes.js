var BookMark = require('./models/todo');

function getBookMarks(res) {
    BookMark.find(function (err, bookmarks) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(bookmarks); // return all todos in JSON format
    });
}
;

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/bookmarks', function (req, res) {
        // use mongoose to get all todos in the database
        getBookMarks(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/bookmarks', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        BookMark.create({
            url: req.body.url,
            category: false
        }, function (err, bookmark) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getBookMarks(res);
        });

    });

    // delete a todo
    app.delete('/api/bookmarks/:todo_id', function (req, res) {
        BookMark.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getBookMarks(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/mat.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};

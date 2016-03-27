var BookMark = require('./models/todo');
var Category = require('./models/category');
var User       = require('./models/user');
function getBookMarks(res,req) {

Category.find({ 'creator' : req.user._id },function (err, categories) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        
        BookMark.find({ 'belongs' : categories._id },function (err, bookmarks) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
        console.log(err);
            res.send(err);
        }

        res.json(bookmarks); // return all todos in JSON format
    });
    });
    
}
function getCategories(res,req) {
    Category.find({ 'creator' : req.user._id },function (err, categories) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
         
        res.json(categories); // return all todos in JSON format
    });
}
module.exports = function (app,passport) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/auth/google', passport.authenticate('google',{ scope : ['profile', 'email'] }));
    // the callback after google has authenticated the user
     app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));
            app.get('/login', function(req, res) {

        //res.sendFile(path.join(__dirname, '../public', 'login.html'));
    });
            // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
     res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
       
    });

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/board/:board_id', isLoggedIn,function (req, res) {
    
     res.render('board.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    
       
    });
    app.get('/api/bookmarks', function (req, res) {
        // use mongoose to get all todos in the database
        getBookMarks(res,req);
    });
    app.get('/api/categories',isLoggedIn, function (req, res) {
        // use mongoose to get all todos in the database
        getCategories(res,req);
    });

    // create todo and send back all todos after creation
    app.post('/api/bookmarks', function (req, res) {

        //
           Category.findOne({ '_id' : req.body.category }, function(err, category) {
                if (err)
                    return done(err);

                if (category) {
                        category.save(function (err) {
                          if (err) return handleError(err);

var story1 = new BookMark({
    url: req.body.url,
            belongs:req.body.category
  });
  
  story1.save(function (err) {
    if (err) return handleError(err);
    // thats it!
  });        
                          
                                  
         
                          
                          
                        });                

                    // if a user is found, log them in
                  // res.sendStatus(200);
                  console.log('hi');
                  getBookMarks(res,req);
                }
            });
        

    });
    
    //create category
      // create todo and send back all todos after creation
    app.post('/api/categories', function (req, res) {
            console.log(req.body.name);
        // create a todo, information comes from AJAX request from Angular
        
        //save user with board name
        // try to find the user based on their google id
           var usersession = req.user;
            User.findOne({ 'google.id' : usersession.google.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {
                        user.save(function (err) {
                          if (err) return handleError(err);
                          
                          
                  Category.create({
            name: req.body.name,
            personal: req.body.personal,
            creator: user._id
        }, function (err, category) {
            if (err)
                console.log(err);

            
        });                         
         
                          
                          
                        });                

                    // if a user is found, log them in
                  // res.sendStatus(200);
                  console.log('hi');
                  getCategories(res,req);
                }
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
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
    
    // delete a todo
    
};
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

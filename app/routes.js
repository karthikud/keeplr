var BookMark = require('./models/bookmark');
var Category = require('./models/category');
var User       = require('./models/user');
function getBookMarks(res,req) {
BookMark.find({ 'belongs' : req.params.category_id },function (err, bookmarks) {

// if there is an error retrieving, send the error. nothing after res.send(err) will execute
if (err) {
console.log(err);
res.send(err);
}

res.json(bookmarks); // return all bookmarks in JSON format
});


}
function getAllBookMarks(res,req) {
BookMark.find({ '_creator' : req.user._id },function (err, bookmarks) {

// if there is an error retrieving, send the error. nothing after res.send(err) will execute
if (err) {
console.log(err);
res.send(err);
}

res.json(bookmarks); // return all bookmarks in JSON format
});


}
function getCategories(res,req) {

Category.find({ 'creator' : req.user._id },function (err, categories) {


if (err) {
res.send(err);
}

res.json(categories); 
});
}
module.exports = function (app,passport) {

    // api ---------------------------------------------------------------------
    
    app.get('/auth/google', passport.authenticate('google',{ scope : ['profile', 'email'] }));
    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
    passport.authenticate('google', {
    successRedirect : '/boards',
    failureRedirect : '/'
    }));
    
            // route for showing the profile page
    app.get('/boards', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
    user : req.user // get the user out of session and pass to template
    });

    });

    // route for logging out
    app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
    });
    
    app.get('/api/bookmarks', function (req, res) {
    getAllBookMarks(res,req);
    });

    app.get('/api/bookmarks/:category_id', function (req, res) {
    BookMark.find({ 'belongs' : req.params.category_id }, function (err, bookmark) {
    if (err)
    res.send(err);

    res.json(bookmark);
    });
    });

    app.get('/api/categories',isLoggedIn, function (req, res) {
    
    getCategories(res,req);
    });

    app.get('/api/categories/:category_id',isLoggedIn, function (req, res) {
    
    Category.findOne({ '_id' : req.params.category_id }, function(err, category) {
    if (err)
    return done(err);

    if (category) {
    // res.sendStatus(200);
    res.json(category);
    }
    });
    });

    // create bookmark
        app.post('/api/bookmarks', function (req, res) {

        //
        var usersession = req.user;
        User.findOne({ 'google.id' : usersession.google.id }, function(err, user) {
        if (err)
        console.log(err);

        if (user) {
        user.save(function (err) {
        if (err) console.log(err);

             //create bookmark withouta board
             if(req.body.category != undefined)
             {

                 Category.findOne({ '_id' : req.body.category }, function(err, category) {
            if (err)
            return done(err);

            if (category) {
            category.save(function (err) {
            if (err)  console.log(err);

            var bookmark1 = new BookMark({
            url: req.body.url,
            belongs:req.body.category,
            _creator:user._id
            });

            bookmark1.save(function (err) {
            if (err) console.log(err);
            // thats it!
            });        

            });                

            
            // res.sendStatus(200);

            }
            });  
                
                 
             }
             else
             {
                 var bookmark1 = new BookMark({
            url: req.body.url,
            
            _creator:user._id
            });

            bookmark1.save(function (err) {
            if (err) console.log(err);
            // thats it!
            });  

             }
                               



        });                

        
        // res.sendStatus(200);
        
        
        }
        });

         getAllBookMarks(res,req);

        });
    //edit board
        app.post('/api/categories_update/:category_id', function (req, res) {
        console.log(req.body.name);
        console.log(req.body.id);

        //save user with board name
        // try to find the user based on their google id
        var usersession = req.user;
        User.findOne({ 'google.id' : usersession.google.id }, function(err, user) {
        if (err)
        return done(err);

            if (user) {
            user.save(function (err) {
            if (err) return handleError(err);

            Category.findOne({ '_id' : req.body.id}, function(err, category) {
            if (err)
            return done(err);

            if (category) {
            console.log('am in ');
            category.name = req.body.name;
            category.personal = req.body.personal;
            category.creator = user._id;

            category.save(function (err) {
            if (err)  console.log(err);


            });                

            
            // res.sendStatus(200);

            }
            });                   



            });                

            
            // res.sendStatus(200);
            
            getCategories(res,req);
            }
        });


        });


    //create category
      
            app.post('/api/categories', function (req, res) {
            console.log(req.body.name);

            //save user with board name
            // try to find the user based on their google id
            var usersession = req.user;
            User.findOne({ 'google.id' : usersession.google.id }, function(err, user) {
            if (err)
            return done(err);

            if (user) {
            user.save(function (err) {
            if (err) console.log(err);


            Category.create({
            name: req.body.name,
            personal: req.body.personal,
            creator: user._id
            }, function (err, category) {
            if (err)
            console.log(err);


            });                         



            });                

            
            // res.sendStatus(200);
            
            getCategories(res,req);
            }
            });


            });

   

// delete a board
        app.delete('/api/categories/:category_id', function (req, res) {
        Category.remove({
        _id: req.params.category_id
        }, function (err, category) {
        if (err)
        res.send(err);

        getCategories(res,req);
        });
        });


// delete a bookmark
        app.delete('/api/bookmarks/:bookmark_id', function (req, res) {
        BookMark.remove({
        _id: req.params.bookmark_id
        }, function (err, category) {
        if (err)
        res.send(err);

        getCategories(res,req);
        });
        });

   

    // application -------------------------------------------------------------
        app.get('*',isLoggedInR , function (req, res) {

        res.render('index.ejs');


        });
    
   
};
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

// if user is authenticated in the session, carry on
if (req.isAuthenticated())
return next();

// if they aren't redirect them to the home page
res.redirect('/');
}
function isLoggedInR(req, res, next) {

// if user is authenticated in the session, carry on
if (req.isAuthenticated())
console.log('loggedin');
res.redirect('/profile');

// if they aren't redirect them to the home page
res.redirect('/');
}

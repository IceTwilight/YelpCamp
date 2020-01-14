var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var campground_model = require("./models/campground");
var comment_model = require("./models/comment");
var user_model = require("./models/user");
var seedDB = require("./seeds");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user")

// var commentRoutes = require("./routes/comment");


seedDB();
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//PASSPORT Configuration
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    // get all campgrounds from DB
    campground_model.find({}, function(err, all_campgrounds){
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: all_campgrounds});//, currentUser: req.user
        }
    });
    
});

app.get("/campgrounds/new", function(req, res){ // show the form send the data to the post route
    res.render("campgrounds/new");
});

app.post("/campgrounds", function(req, res){// new -> campgrounds+POST  
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var img = req.body.image;
    var description = req.body.description;
    var new_campground = {name:name, image:img, description:description};
    campground_model.create(new_campground, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            //redirect back to campgrounds
            res.redirect("/campgrounds");
        }
    })
    // campgrounds.push({name:name, image:img});
    
});

// Show more info about one campground - id
app.get("/campgrounds/:id", function(req, res){
    campground_model.findById(req.params.id).populate("comments").exec(function(err, found){
        if (err) {
            console.log(err);
        } else {
            console.log(found);
            res.render("campgrounds/show", {campground: found});
        }
    });
    
});

// ===================== comments routes
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    campground_model.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
    
});

app.post("/campgrounds/:id/comments",isLoggedIn, function(req, res){
    // lookup campground by ID
    campground_model.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            comment_model.create(req.body.comment, function(err, comment){
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
    // create new comment

    // connect new comment to the campground

    // redirect campground show page

});


// AUTH ROUTES
//show register form
app.get("/register", function(req, res){
    res.render('register');
});
// handle
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//show login form
app.get("/login", function(req, res){
    res.render("login");
});
//handle login
// app.post("/login", middleware, func)
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
});

//logout
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
})


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, function(){
    console.log("Server starts on port 3000");
});
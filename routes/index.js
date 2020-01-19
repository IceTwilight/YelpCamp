var express = require("express");
var router = express.Router();

var passport = require("passport");
var User = require("../models/user");
var campground_model = require("../models/campground");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

// AUTH ROUTES
//show register form
router.get("/register", function(req, res){
    res.render('register', {page: "register"});
});
// handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.body.avatar,
        email: req.body.email
    });
    if (req.body.adminCode === "admin chaossky") {
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            return res.render("register", {error: err.message});
            // req.flash("error", err.message);
            
            // res.redirect("register");// gai
              
        }
        else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to YelpCamp! " + user.username);
                
                res.redirect("/campgrounds");
                
            
            });
        }
    });
});

//show login form
router.get("/login", function(req, res){
    res.render("login", {page: "login"});
});
//handle login logic
// router.post("/login", middleware, func)
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
});

//logout
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!")
    req.session.save(function(){
        res.redirect("/campgrounds");
    });
});

//user profiles
router.get("/users/:id", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if (err) {
            req.flash("error", "Something went wrong!");
            res.redirect("/");
        } else {
            campground_model.find().where('author.id').equals(foundUser._id).exec(function(err, allCampgrounds){
                if(err) {
                    req.flash("error", "Something went wrong!");
                    res.redirect("/");
                } else {
                    
                    // console.log(campgrounds);
                    res.render("users/show", {user: foundUser, campgrounds:allCampgrounds});
                }
            });
            
        }

    });
});

module.exports = router;

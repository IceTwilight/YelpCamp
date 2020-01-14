var express = require("express");
var router = express.Router({mergeParams: true}); //or id is null

var campground_model = require("../models/campground");
var comment_model = require("../models/comment");

// ===================== comments routes
// new form
router.get("/new", isLoggedIn, function(req, res){
    campground_model.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
    
});
//create comment
router.post("/",isLoggedIn, function(req, res){
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
                    // add username and id to comment -- req.user
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();

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

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
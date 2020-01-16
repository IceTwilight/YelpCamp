var campground_model = require("../models/campground");
var comment_model = require("../models/comment");
// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    // is user logged in
    if (req.isAuthenticated()){
            
        campground_model.findById(req.params.id, function(err, foundCampground){
            if (err) {
                res.redirect("back");
            } else {
                // does user own the campground
                // founcCampground.author.id is mongoose object
                // console.log(foundCampground.author.id, req.user._id);
                // next();
                if( foundCampground.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    res.redirect("back");
                }              
            }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    // is user logged in
    if (req.isAuthenticated()){
            
        comment_model.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                res.redirect("back");
            } else {
                // does user own the campground
                // founcCampground.author.id is mongoose object
                // console.log(foundCampground.author.id, req.user._id);
                // next();
                if( foundComment.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    res.redirect("back");
                }              
            }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;
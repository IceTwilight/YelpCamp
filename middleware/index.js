var campground_model = require("../models/campground");
var comment_model = require("../models/comment");
// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    // is user logged in
    if (req.isAuthenticated()){
            
        campground_model.findById(req.params.id, function(err, foundCampground){
            if (err) {
                req.flash("error", "You need to be logged in to do that!");
                res.redirect("back");
            } else {
                // does user own the campground
                // founcCampground.author.id is mongoose object
                // console.log(foundCampground.author.id, req.user._id);
                // next();
                if( foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                }
                else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }              
            }
        });
    } else {
        req.flash("error", "Campground can't be found!")
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    // is user logged in
    if (req.isAuthenticated()){
            
        comment_model.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                // req.flash("error", "You need to be logged in to do that!");
                res.redirect("back");
            } else {
                // does user own the campground
                // founcCampground.author.id is mongoose object
                // console.log(foundCampground.author.id, req.user._id);
                // next();
                if( foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                }
                else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }              
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");// shows when next render, so before redirect
    res.redirect("/login");
}

module.exports = middlewareObj;
var express = require("express");
var router = express.Router({mergeParams: true}); //or id is null

var campground_model = require("../models/campground");
var comment_model = require("../models/comment");
var middleware = require("../middleware");

// ===================== comments routes
// new form
router.get("/new", middleware.isLoggedIn, function(req, res){
    campground_model.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
    
});
//create comment
router.post("/", middleware.isLoggedIn, function(req, res){
    // lookup campground by ID
    campground_model.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            comment_model.create(req.body.comment, function(err, comment){
                if (err) {
                    req.flash("error", "Something went wrong...!")
                    // console.log(err);
                } else {
                    // add username and id to comment -- req.user
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();

                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added new comments");
                    // req.session.save(function(){
                    //     res.redirect("/campgrounds" + campground._id);
                    // });
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
    // create new comment

    // connect new comment to the campground

    // redirect campground show page

});

//comment edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    // console.log(req.params.id); - campground_id
    comment_model.findById(req.params.comment_id, function(err, foundComment){
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id:req.params.id, comment: foundComment});
        }
    });
});
// comment update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    comment_model.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

// comment destroy route
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    // findbyid and remove
    comment_model.findByIdAndRemove(req.params.comment_id, function(err){
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted successfully!");
            // req.session.save(function(){
            //     res.redirect("/campgrounds" + req.params.id);
            // });
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});




module.exports = router;
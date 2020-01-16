var express = require("express");
var router = express.Router();

var middleware = require("../middleware");// index auto find
// var middleware = require("../middleware/index")

var campground_model = require("../models/campground");
 
// index show all campgrounds
router.get("/", function(req, res){
    // get all campgrounds from DB
    campground_model.find({}, function(err, all_campgrounds){
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: all_campgrounds});//, currentUser: req.user
        }
    });
    
});

router.get("/new", middleware.isLoggedIn, function(req, res){ // show the form send the data to the post route
    res.render("campgrounds/new");
});

// create new campground
router.post("/", middleware.isLoggedIn, function(req, res){// new -> campgrounds+POST  
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var img = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }; 
    var new_campground = {name:name, image:img, description:description, author: author};
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
router.get("/:id", function(req, res){
    campground_model.findById(req.params.id).populate("comments").exec(function(err, found){
        if (err) {
            console.log(err);
        } else {
            console.log(found);
            res.render("campgrounds/show", {campground: found});
        }
    });
    
});

//edit route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    
    campground_model.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
        
    
    
});

//update route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground
    campground_model.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
    // redirect show page
})

// Destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    campground_model.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
});


module.exports = router;
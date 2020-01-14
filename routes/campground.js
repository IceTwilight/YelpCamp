var express = require("express");
var router = express.Router();

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

router.get("/new", function(req, res){ // show the form send the data to the post route
    res.render("campgrounds/new");
});

router.post("/", function(req, res){// new -> campgrounds+POST  
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

module.exports = router;
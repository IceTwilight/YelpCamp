var express = require("express");
var router = express.Router();

var middleware = require("../middleware");// index auto find
// var middleware = require("../middleware/index")

var campground_model = require("../models/campground");
 
//================
// Add multer and cloudinary configuration
//================

var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'chaosssky', 
  api_key: '972127684378754', 
  api_secret: 't5cQuVQiMt3_KyuqmKonmJ47N5U'
});

//===========================
// ROUTES
//===========================

// index show all campgrounds
router.get("/", function(req, res){
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // get all campgrounds from DB
        campground_model.find({name: regex}, function(err, all_campgrounds){
            if (err){
                console.log(err);
            } else {
                var noMatch = "";
                if (all_campgrounds.length < 1) {
                    noMatch = "No campgrounds match that query, please try again";
                }
                res.render("campgrounds/index", {campgrounds: all_campgrounds, page: 'campgrounds', noMatch:noMatch});//, currentUser: req.user
            }
        });
    } else {
        // get all campgrounds from DB
        campground_model.find({}, function(err, all_campgrounds){
            if (err){
                console.log(err);
            } else {
                res.render("campgrounds/index", {campgrounds: all_campgrounds, page: 'campgrounds', noMatch:""});//, currentUser: req.user
            }
        });
    }
    
    
});

router.get("/new", middleware.isLoggedIn, function(req, res){ // show the form send the data to the post route
    res.render("campgrounds/new");
});

// create new campground
router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res){// new -> campgrounds+POST  
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var img = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }; 
    var new_campground = {name:name, price:price, image:img, description:description, author: author};
    // cloudinary.uploader.upload(req.file.path, function(result) {
    //     // add cloudinary url for the image to the campground object under image property
    //     var image = result.secure_url;
    //     new_campground.image = image;
        
    //     campground_model.create(new_campground, function(err, campground) {
    //       if (err) {
    //         req.flash('error', err.message);
    //         return res.redirect('back');
    //       }
    //       res.redirect('/campgrounds/' + campground.id);
    //     });
    // });
    campground_model.create(new_campground, function(err, newlyCreated){
        if (err) {
            req.flash('error', err.message);
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

//regular expression
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}


module.exports = router;
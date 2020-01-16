var mongoose = require("mongoose");
var campground_model = require("./models/campground");
var comment_model = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image:"https://cdn.britannica.com/75/93575-050-8ADFBBE0/fishing-Camping-activities-canoeing-Minnesota-Boundary-Waters.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt debitis commodi quam voluptate modi itaque numquam, accusantium sit explicabo excepturi illo. Quibusdam corporis accusamus fugiat porro voluptate vel, esse magnam? 1"
    },
    {
        name: "Star Nighty night", 
        image:"https://www.discovermoab.com/wp-content/uploads/2017/10/camping-blm.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt debitis commodi quam voluptate modi itaque numquam, accusantium sit explicabo excepturi illo. Quibusdam corporis accusamus fugiat porro voluptate vel, esse magnam? 2"
    },
    {
        name: "New Zealand", 
        image:"https://www.newzealand.com/assets/Tourism-NZ/Nelson/ba40378fe9/img-1536928144-4748-13836-F53C3949-ED9E-E0DC-CF6EC0D789D9308A__FocalPointCropWzI0MCw0ODAsNTAsNTAsNzUsImpwZyIsNjUsMi41XQ.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt debitis commodi quam voluptate modi itaque numquam, accusantium sit explicabo excepturi illo. Quibusdam corporis accusamus fugiat porro voluptate vel, esse magnam? 3"
    }
];

function seedDB(){
    // remove all campgrounds
    campground_model.deleteMany({}, function(err){
        if (err) {
            console.log(err);
        }
        // console.log("remove campground");
        //  // add some campgrounds
        // data.forEach(function(seed){
        //     campground_model.create(seed, function(err, campground){
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log("Add a campground");
        //             comment_model.create({
        //                 text:"youjindekeiyakulie",
        //                 author: "Steve Li"
        //             }, function(err, comment){
        //                 if (err) {
        //                     console.log(err);
        //                 } else {
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log("created a new comment");
        //                 }
        //             });
        //         }
        //     });
        // });
    });
    
   
}

module.exports = seedDB;
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//schema setup
var campground_schema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var campground_model = mongoose.model("campground_model", campground_schema);
// campground_model.create(
//     {
//         name: "Salmon", 
//         image: "https://www.reserveamerica.com/webphotos/racms/articles/images/bca19684-d902-422d-8de2-f083e77b50ff_image2_GettyImages-677064730.jpg",
//         description: "First test comments lalala."    
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("New campground: ")
//             console.log(campground);
//         }

//     });

// var campgrounds = [
//     {name: "Salmon", image: "https://www.reserveamerica.com/webphotos/racms/articles/images/bca19684-d902-422d-8de2-f083e77b50ff_image2_GettyImages-677064730.jpg"},
//     {name: "Titty", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQLOntxCNn67DIqFWkkpjucQG_sVu4VCAQLxtLjd1An37Fapiy&s"},
//     {name: "Bully", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ9ykdpP5hp3IwrjCL7BTVZUeFMrtLmvfPsK0i2TBRNf0_PCOi&s"},
//     {name: "Salmon", image: "https://www.reserveamerica.com/webphotos/racms/articles/images/bca19684-d902-422d-8de2-f083e77b50ff_image2_GettyImages-677064730.jpg"},
//     {name: "Titty", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQLOntxCNn67DIqFWkkpjucQG_sVu4VCAQLxtLjd1An37Fapiy&s"},
//     {name: "Bully", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ9ykdpP5hp3IwrjCL7BTVZUeFMrtLmvfPsK0i2TBRNf0_PCOi&s"},
//     {name: "Salmon", image: "https://www.reserveamerica.com/webphotos/racms/articles/images/bca19684-d902-422d-8de2-f083e77b50ff_image2_GettyImages-677064730.jpg"},
//     {name: "Titty", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQLOntxCNn67DIqFWkkpjucQG_sVu4VCAQLxtLjd1An37Fapiy&s"},
//     {name: "Bully", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ9ykdpP5hp3IwrjCL7BTVZUeFMrtLmvfPsK0i2TBRNf0_PCOi&s"}
// ];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    // get all campgrounds from DB
    campground_model.find({}, function(err, all_campgrounds){
        if (err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: all_campgrounds});
        }
    });
    
});

app.get("/campgrounds/new", function(req, res){ // show the form send the data to the post route
    res.render("new");
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
    campground_model.findById(req.params.id, function(err, found){
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground: found});
        }
    });
    
});

app.listen(3000, function(){
    console.log("Server starts on port 3000");
});
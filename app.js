var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon", image: "https://www.reserveamerica.com/webphotos/racms/articles/images/bca19684-d902-422d-8de2-f083e77b50ff_image2_GettyImages-677064730.jpg"},
    {name: "Titty", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQLOntxCNn67DIqFWkkpjucQG_sVu4VCAQLxtLjd1An37Fapiy&s"},
    {name: "Bully", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ9ykdpP5hp3IwrjCL7BTVZUeFMrtLmvfPsK0i2TBRNf0_PCOi&s"},
    {name: "Salmon", image: "https://www.reserveamerica.com/webphotos/racms/articles/images/bca19684-d902-422d-8de2-f083e77b50ff_image2_GettyImages-677064730.jpg"},
    {name: "Titty", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQLOntxCNn67DIqFWkkpjucQG_sVu4VCAQLxtLjd1An37Fapiy&s"},
    {name: "Bully", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ9ykdpP5hp3IwrjCL7BTVZUeFMrtLmvfPsK0i2TBRNf0_PCOi&s"},
    {name: "Salmon", image: "https://www.reserveamerica.com/webphotos/racms/articles/images/bca19684-d902-422d-8de2-f083e77b50ff_image2_GettyImages-677064730.jpg"},
    {name: "Titty", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQLOntxCNn67DIqFWkkpjucQG_sVu4VCAQLxtLjd1An37Fapiy&s"},
    {name: "Bully", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ9ykdpP5hp3IwrjCL7BTVZUeFMrtLmvfPsK0i2TBRNf0_PCOi&s"}
];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){ // show the form send the data to the post route
    res.render("new");
});

app.post("/campgrounds", function(req, res){// new -> campgrounds+POST  
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var img = req.body.image;
    campgrounds.push({name:name, image:img});
    //redirect back to campgrounds
    res.redirect("/campgrounds");
});

app.listen(3000, function(){
    console.log("Server starts on port 3000");
});
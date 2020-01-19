var mongoose = require("mongoose");
//schema setup
var campground_schema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    createdAt: {type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    } ,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment_model"
        }
    ]
});

var campground_model = mongoose.model("campground_model", campground_schema);

module.exports = campground_model;

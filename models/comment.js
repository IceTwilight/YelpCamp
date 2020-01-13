var mongoose = require("mongoose");

var comment_schema = new mongoose.Schema({
    text: String,
    author: String
});

var comment_model = mongoose.model("comment_model", comment_schema);


module.exports = comment_model;
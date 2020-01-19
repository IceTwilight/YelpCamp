var mongoose = require("mongoose");

var comment_schema = new mongoose.Schema({
    text: String,
    createdAt: {type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

var comment_model = mongoose.model("comment_model", comment_schema);


module.exports = comment_model;
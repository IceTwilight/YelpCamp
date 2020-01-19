var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose")

var user_schema = new mongoose.Schema({
    username: String,
    password: String,
    avatar: String,
    firstName: String,
    lastName: String,
    email: String,
    isAdmin: {type: Boolean, default:false}
});
user_schema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", user_schema);


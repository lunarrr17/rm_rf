// this is a mongoose schema - username , user email , password , role , isVerified , createdAt
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    // these are the manual fields
    username : {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password : {
        type: String,
        required: true
    },
    role : {
        type: String,
        enum: ["user" , "admin"],
        default: "user"
    },
    isVerified : {
        type: Boolean,
        default: false
    }
} , { timestamps: true })   // tells mongoose to automatically add createdAt and updatedAt timestamps to every document and manage them for you ... you never touch them manually and hence they are defined separately

const User = mongoose.model("User" , userSchema);
module.exports = User;

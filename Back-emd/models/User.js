const mongoose = require("mongoose")


const UserSchema= new mongoose.Schema(
    {
        username: { type:String, require:true},
        email: { type:String, require:true },
        password: { type:String, require:true },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        verif:{
            type: Boolean,
            default: false,
        },
        img: { type: String,default:null  },
    },
    {timestamps: true}
);
module.exports = mongoose.model("User",UserSchema)
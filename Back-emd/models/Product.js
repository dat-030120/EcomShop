const mongoose = require("mongoose")


const ProductSchema= new mongoose.Schema(
    {
        title: { type:String, require:true},
        desc: { type:String, require:true},
        img: { type: String, required: true },
        category: { type: String, required: true },
        price: { type:Number, require:true },
        inStock:{ type:Boolean, default:true}
    },
    {timestamps: true}
);
module.exports = mongoose.model("Product",ProductSchema)
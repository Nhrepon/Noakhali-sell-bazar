const mongoose = require("mongoose");

const databaseSchema=mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:String, required:true},
    image:{type:String, required:true},

    productId:{type:mongoose.Schema.Types.ObjectId, required:true}
},{timestamps:true, versionKey:false});

const ProductSliderModel=mongoose.model('productSliders', databaseSchema);
module.exports=ProductSliderModel;
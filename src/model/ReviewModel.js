const mongoose = require("mongoose");

const databaseSchema=mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, required:true},
    productId:{type:mongoose.Schema.Types.ObjectId, required:true},
    description:{type:String, required:true},
    rating:{type:String, required:true},
},{timestamps:true, versionKey:false});

const ReviewModel=mongoose.model('reviews', databaseSchema);
module.exports=ReviewModel;
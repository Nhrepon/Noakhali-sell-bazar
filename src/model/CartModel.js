const mongoose = require("mongoose");

const databaseSchema=mongoose.Schema({
    productId:{type:mongoose.Schema.Types.ObjectId, required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, required:true},
    quantity:{type:String, required:true},
    color:{type:String, required:true},
    size:{type:String, required:true}
},{timestamps:true, versionKey:false});

const CartModel=mongoose.model('carts', databaseSchema);
module.exports=CartModel;

const mongoose = require("mongoose");

const databaseSchema=mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:String, required:true},
    discount:{type:Boolean, required:true},
    discountPrice:{type:String, required:true},
    image:{type:String, required:true},
    star:{type:String, required:true},
    stock:{type:String, required:true},
    remark:{type:String, required:true},
    categoryId:{type:mongoose.Schema.Types.ObjectId, required:true},
    brandId:{type:mongoose.Schema.Types.ObjectId, required:true}
},{timestamps:true, versionKey:false});

const ProductModel=mongoose.model('products', databaseSchema);
module.exports=ProductModel;
const mongoose = require("mongoose");

const databaseSchema=mongoose.Schema({
    brandName:{type:String, required:true, unique:true},
    brandImage:{type:String, required:true}
},{timestamps:true, versionKey:false});

const BrandModel=mongoose.model('brands', databaseSchema);
module.exports=BrandModel;
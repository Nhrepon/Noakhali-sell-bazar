const mongoose = require("mongoose");
const databaseSchema=mongoose.Schema({
    categoryName:{type:String, required:true, unique:true},
    categoryImage:{type:String, required:true}
},{timestamps:true, versionKey:false});

const CategoryModel=mongoose.model('categories', databaseSchema);
module.exports=CategoryModel;
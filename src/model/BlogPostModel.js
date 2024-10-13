const mongoose = require("mongoose");

const databaseSchema=mongoose.Schema({
    title:{type:String, required:true},
    content:{type:String},
    userId:{type:mongoose.Schema.Types.ObjectId},
    categoryId:{type:mongoose.Schema.Types.ObjectId},
    thumbnail:{type:String},
    tags:{type:String}
},{timestamps:true, versionKey:false});

const BlogPostModel=mongoose.model('blogPosts', databaseSchema);
module.exports=BlogPostModel;
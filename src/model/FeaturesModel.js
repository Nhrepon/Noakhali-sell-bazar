const mongoose = require("mongoose");

const databaseSchema=mongoose.Schema({
    nmae:{type:String, required:true},
    description:{type:String},
    img:{type:String}
},{timestamps:true, versionKey:false});

const FeaturesModel=mongoose.model('features', databaseSchema);
module.exports=FeaturesModel;
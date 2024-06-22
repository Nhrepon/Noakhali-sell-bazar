const mongoose = require("mongoose");

const databaseSchema=mongoose.Schema({
    type:{type:String, required:true, unique:true},
    description:{type:String, required:true},
},{timestamps:true, versionKey:false});

const LegalModel=mongoose.model('legals', databaseSchema);
module.exports=LegalModel;
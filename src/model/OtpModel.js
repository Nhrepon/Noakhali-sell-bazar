const mongoose = require("mongoose");

const databaseSchema=mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, required:true},
    email:{type:String, required:true},
    otp:{type:String, required:true},
},{timestamps:true, versionKey:false});

const OtpModel=mongoose.model('otps', databaseSchema);
module.exports=OtpModel;
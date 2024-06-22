const mongoose = require("mongoose");

const databaseSchema=mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, required:true},
    userName:{type:String, required:true},
    userMobile:{type:String, },
    userAddress:{type:String,},
    userCity:{type:String, },
    userState:{type:String, },
    userPostCode:{type:String, },
    userCountry:{type:String, },

    shippingAddress:{type:String, },
    shippingCity:{type:String, },
    shippingState:{type:String, },
    shippingPostCode:{type:String, },
    shippingCountry:{type:String, },

}, {timestamps:true, versionKey:false});

const ProfileModel=mongoose.model('profiles', databaseSchema);
module.exports=ProfileModel;

const mongoose = require("mongoose");

const databaseSchema=mongoose.Schema({
    storeId:{type:String, required:true},
    storePassword:{type:String, required:true},
    currency:{type:String, required:true},
    successUrl:{type:String, required:true},
    failUrl:{type:String, required:true},
    cancelUrl:{type:String, required:true},
    ipnUrl:{type:String, required:true},
    initUrl:{type:String, required:true}
},{timestamps:true, versionKey:false});

const PaymentSettingModel=mongoose.model('paymentSettings', databaseSchema);
module.exports=PaymentSettingModel;
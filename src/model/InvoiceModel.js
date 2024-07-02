const mongoose = require("mongoose");

const databaseSchema=mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, required:true},
    payable:{type:String, required:true},
    customerDetails:{type:String, required:true},
    shippingDetails:{type:String, required:true},

    transactionId:{type:String, required:true},
    validationId:{type:String, required:true},
    paymentStatus:{type:String, required:true},

    deliveryStatus:{type:String, required:true},

    total:{type:String, required:true},
    vat:{type:String, required:true}
},{timestamps:true, versionKey:false});

const InvoiceModel=mongoose.model('invoices', databaseSchema);
module.exports=InvoiceModel;
const mongoose = require("mongoose");
const CartModel = require("../model/CartModel");
const ProfileModel = require("../model/ProfileModel");
const InvoiceModel = require("../model/InvoiceModel");
const InvoiceProductModel=require("../model/InvoiceProductModel");
const PaymentSettingModel=require("../model/PaymentSettingModel");
const ObjectId=mongoose.Types.ObjectId;
const FormData=require('form-data');
const axios=require('axios');


const createInvoiceService = async (req) => {
    try {
        const userId=ObjectId(req.headers.userId);
        const userEmail=req.headers.email;
        
        // Step 01: Calculate Total Payable & Vat
        const matchStage={$match:{userId:userId}};
        const joinStageWithProduct={$lookup:{
            from:"products",
            localField:"productId",
            foreignField:"_id",
            as:"product"
        }}

        const unwindProductStage={$unwind:"$product"};
        const CartProducts=await CartModel.aggregate(
            [
                matchStage,
                joinStageWithProduct,
                unwindProductStage
            ]
        );

        let totalAmount=0;
        CartProducts.forEach((element)=>{
            let price;
            if(element['product'][discount]){
                price=parseFloat(element['product']['discountPrice']);
            }else{
                price=parseFloat(element['product']['price']);
            }
            totalAmount+=parseFloat(element['quantity']*price);
        });
        let vat=totalAmount*0.05;
        let payable=totalAmount+vat;


        // Step 02: Prepare  Customer Details & Shipping Details
        const profile=await ProfileModel.findOne({userId:userId});
        const userDetails=`
        Name: ${profile[0]['userName']},
        Email: ${userEmail},
        Mobile: ${profile[0]['userMobile']},
        Address: ${profile[0]['userAddress']},
        City: ${profile[0]['userCity']},
        State: ${profile[0]['userState']},
        PostCode: ${profile[0]['userPostCode']},
        Country: ${profile[0]['userCountry']}
        `;
        const shipingDetails=`
        Name: ${profile[0]['userName']},
        Address: ${profile[0]['shipingAddress']},
        City: ${profile[0]['shipingCity']},
        State: ${profile[0]['shipingState']},
        PostCode: ${profile[0]['shipingPostCode']},
        Country: ${profile[0]['shipingCountry']}
        `;


        // Step 03: Transaction & Other's ID
        const transactionId=Math.floor(10000000 + Math.random() * 90000000);
        const validationId=0;
        const deliveryStatus="Pending";
        const paymentStatus="Pending";



        // Step 04: Create Invoice
        const createInvoice=await InvoiceModel.create({
            userId:userId,
            payable:payable,
            customerDetails:userDetails,
            shipingDetails:shipingDetails,
            transactionId:transactionId,
            validationId:validationId,
            paymentStatus:paymentStatus,
            deliveryStatus:deliveryStatus,
            total:totalAmount,
            vat:vat
        })


        // Step 05: Create Invoice Product
        const invoiceId=createInvoice['_id'];
        CartProducts.forEach(async(element)=>{
            await InvoiceProductModel.create({
                userId:userId,
                productId:element['productId'],
                invoiceId:invoiceId,
                quantity:element['quantity'],
                price:element['product']['price']?element['product']['discountPrice']:element['product']['price'],
                color:element['product']['color'],
                size:element['product']['size']
            });
        });



        // Step 06: Remove Carts
        await CartModel.deleteMany({userId:userId});



        // Step 07: Prepare SSL Payment
        const paymentSetting=await PaymentSettingModel.findOne();
        const form=new FormData();
        form.append('store_id', paymentSetting[0]['storeId']);
        form.append('store_pass', paymentSetting[0]['storePassword']);
        form.append('total_amount', payable.toString());
        form.append('currency', paymentSetting[0]['currency']);
        form.append('tran_id', transactionId);

        form.append('success_url', `${paymentSetting[0]['successUrl']}/${transactionId}`);
        form.append('fail_url', `${paymentSetting[0]['failUrl']}/${transactionId}`);
        form.append('cancel_url', `${paymentSetting[0]['cancelUrl']}/${transactionId}`);
        form.append('ipn_url', `${paymentSetting[0]['ipnUrl']}/${transactionId}`);

        form.append('customerName', profile[0]['userName']);
        form.append('customerEmail', userEmail);
        form.append('customerMobile', profile[0]['userMobile']);
        form.append('customerAddress' , profile[0]['userAddress']);
        form.append('customerCity' , profile[0]['userCity']);
        form.append('customerState' , profile[0]['userState']);
        form.append('customerPostCode' , profile[0]['userPostCode']);
        form.append('customerCountry' , profile[0]['userCountry']);

        form.append('shippingMethod', "Yes");
        form.append('ShippingName', profile[0]['userName']);
        form.append('shippingAddress' , profile[0]['shipingAddress']);
        form.append('shippingCity' , profile[0]['shipingCity']);
        form.append('shippingState' , profile[0]['shipingState']);
        form.append('shippingPostCode' , profile[0]['shipingPostCode']);
        form.append('shippingCountry' , profile[0]['shipingCountry']);

        form.append('ProductName', "Product Name");
        form.append('ProductCategory', "Product Category");
        form.append('ProductProfile', "Product Profile");
        form.append('ProductAmount', "Product Amount");

        let SSLRes=await axios.post(paymentSetting[0]['initUrl'], form);

        return {status:"Success", message:SSLRes.data};





    } catch (error) {
        return {status:"Failed", message:error};
    }
}





const paymentSuccessService=async(req)=>{
    try {
        const transactionId=req.params.trxID;
        await InvoiceModel.updateOne({transactionId:transactionId}, {paymentStatus:"Success"});
        return {status:"Success"}
    } catch (error) {
        return {status:"Failed", message:error};
    }
}





const paymentFailService=async(req)=>{
    try {
        const transactionId=req.params.trxID;
        await InvoiceModel.updateOne({transactionId:transactionId}, {paymentStatus:"Fail"});
        return {status:"Fail"}
    } catch (error) {
        return {status:"Failed", message:error};
    }
}






const paymentCancelService=async(req)=>{
    try {
        const transactionId=req.params.trxID;
        await InvoiceModel.updateOne({transactionId:transactionId}, {paymentStatus:"Cancel"});
        return {status:"Cancel"}
    } catch (error) {
        return {status:"Failed", message:error};
    }
}






const paymentIPNService=async(req)=>{
    try {
        const transactionId=req.params.trxID;
        const status=req.body['status'];
        await InvoiceModel.updateOne({transactionId:transactionId}, {paymentStatus:status});
        return {status:"success"}
    } catch (error) {
        return {status:"Failed", message:error};
    }
}





const invoiceListService=async(req)=>{
    try {
        const userId=ObjectId(req.headers.userId);
        const data=await InvoiceModel.find({userId:userId});
        return {status:"Success", data:data};
    } catch (error) {
        return {status:"Failed", message:error};
    }
}





const invoiceProductListService = async (req)=>{
    try {
        const userId=ObjectId(req.headers.userId);
        const invoiceId=ObjectId(req.params.invoiceId);
        const matchStage={$match:{userId:userId, invoiceId:invoiceId}};
        const joinStageWithProduct={$lookup:{
            from:"products",
            localField:"productId",
            foreignField:"_id",
            as:"product"
        }}
        const unwindProduct={$unwind:"$product"};
        const products=await InvoiceProductModel.aggregate(
            [
                matchStage,
                joinStageWithProduct,
                unwindProduct
            ]
        );

        return {status:"Success", data:products};
    } catch (error) {
        return {status:"Failed", message:error};
    }
}



module.exports={
    createInvoiceService,
    paymentSuccessService,
    paymentFailService,
    paymentCancelService,
    paymentIPNService,
    invoiceListService,
    invoiceProductListService

}
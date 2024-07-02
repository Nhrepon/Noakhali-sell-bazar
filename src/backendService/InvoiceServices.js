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
        const userId=new ObjectId(req.headers.userId);
        const userEmail=req.headers.email;
        
        // Step 01: Calculate Total Payable & Vat
        const matchStage={$match:{userId:userId}};
        const joinStageWithProduct={$lookup:{
            from:"products",
            localField:"productId",
            foreignField:"_id",
            as:"product"
        }};

        const unwindProductStage={$unwind:"$product"};
        const CartProducts=await CartModel.aggregate(
            [
                matchStage,
                joinStageWithProduct,
                unwindProductStage
            ]
        );

        




 
        let totalAmount=0;
        CartProducts.map((item, i)=>{
            let price=0;
            if(item['product']['discount']===true){
                price=parseFloat(item['product']['discountPrice']);
            }else{
                price=parseFloat(item['product']['price']);
            }
            totalAmount+=(parseFloat(item['quantity'])*price);
        });
        let vat=totalAmount*0.05;
        let payable=totalAmount+vat;


       // Step 02: Prepare  Customer Details & Shipping Details
        const profile=await ProfileModel.findOne({userId:userId});
        const userDetails=`
        Name: ${profile['userName']},
        Email: ${userEmail},
        Mobile: ${profile['userMobile']},
        Address: ${profile['userAddress']},
        City: ${profile['userCity']},
        State: ${profile['userState']},
        PostCode: ${profile['userPostCode']},
        Country: ${profile['userCountry']}
        `;
        const shippingDetails=`
        Name: ${profile['userName']},
        Address: ${profile['shippingAddress']},
        City: ${profile['shippingCity']},
        State: ${profile['shippingState']},
        PostCode: ${profile['shippingPostCode']},
        Country: ${profile['shippingCountry']}
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
            shippingDetails:shippingDetails,
            transactionId:transactionId,
            validationId:validationId,
            paymentStatus:paymentStatus,
            deliveryStatus:deliveryStatus,
            total:totalAmount,
            vat:vat
        }); 

       

        // Step 05: Create Invoice Product
        const invoiceId=createInvoice['_id'];
        CartProducts.forEach(async(element)=>{
            await InvoiceProductModel.create({
                userId:userId,
                productId:element['productId'],
                invoiceId:invoiceId,
                quantity:element['quantity'],
                price:element['product']['price']?element['product']['discountPrice']:element['product']['price'],
                color:element['color'],
                size:element['size']
            });
        }); 

        


        // Step 06: Remove Carts
        //await CartModel.deleteMany({userId:userId});



        // Step 07: Prepare SSL Payment
        const paymentSetting=await PaymentSettingModel.find();
        let form=new FormData();
    form.append('store_id',paymentSetting['storeId'])
    form.append('store_passwd',paymentSetting['storePassword'])
    form.append('total_amount',payable.toString())
    form.append('currency',paymentSetting['currency'])
    form.append('tran_id',transactionId)

    form.append('success_url',`${paymentSetting['successUrl']}/${transactionId}`)
    form.append('fail_url',`${paymentSetting['failUrl']}/${transactionId}`)
    form.append('cancel_url',`${paymentSetting['cancelUrl']}/${transactionId}`)
    form.append('ipn_url',`${paymentSetting['ipnUrl']}/${transactionId}`)

    form.append('cus_name',profile['userName'])
    form.append('cus_email',userEmail)
    form.append('cus_add1',profile['userAddress'])
    form.append('cus_add2',profile['useAddress'])
    form.append('cus_city',profile['userCity'])
    form.append('cus_state',profile['userState'])
    form.append('cus_postcode',profile['userPostCode'])
    form.append('cus_country',profile['userCountry'])
    form.append('cus_phone',profile['userMobile'])
    form.append('cus_fax',profile['userMobile'])

    form.append('shipping_method',"YES")
    form.append('ship_name',profile['userName'])
    form.append('ship_add1',profile['shippingAddress'])
    form.append('ship_add2',profile['shippingAddress'])
    form.append('ship_city',profile['shippingCity'])
    form.append('ship_state',profile['shippingState'])
    form.append('ship_country',profile['shippingCountry'])
    form.append('ship_postcode',profile['shippingPostCode'])

    form.append('product_name','According Invoice')
    form.append('product_category','According Invoice')
    form.append('product_profile','According Invoice')
    form.append('product_amount','According Invoice')

    let SSLRes=await axios.post(paymentSetting['initUrl'],form);

    return {status:"success",data:SSLRes.data}






        //return {status:"success", data:createInvoice, message: paymentSetting};

    } catch (error) {
        return {status:"failed", message:error};
    }
}





const paymentSuccessService=async(req)=>{
    try {
        const transactionId=req.params.trxID;
        await InvoiceModel.updateOne({transactionId:transactionId}, {paymentStatus:"success"});
        return {status:"success"}
    } catch (error) {
        return {status:"failed", message:error};
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
        return {status:"success", data:data};
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

        return {status:"success", data:products};
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
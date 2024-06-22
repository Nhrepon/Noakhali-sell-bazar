const {createInvoiceService,
    paymentSuccessService,
    paymentFailService,
    paymentCancelService,
    paymentIPNService,
    invoiceListService,
    invoiceProductListService
}=require('../backendService/InvoiceServices');



exports.createInvoice= async (req, res)=>{
    const result=await createInvoiceService(req);
    return res.json(result);
}


exports.paymentSuccess= async (req, res)=>{
    const result=await paymentSuccessService(req);
    return res.json(result);
}





exports.paymentFail=async (req, res)=>{
    const result=await paymentFailService(req);
    return res.json(result);
}




exports.paymentCancel=async (req, res)=>{
    const result=await paymentCancelService(req);
    return res.json(result);
}



exports.paymentIPN=async (req, res)=>{
    const result=await paymentIPNService(req);
    return res.json(result);
}




exports.invoiceList=async (req, res)=>{
    const result=await invoiceListService(req);
    return res.json(result);
}




exports.invoiceProductList=async (req, res)=>{
    const result=await invoiceProductListService(req);
    return res.json(result);
}
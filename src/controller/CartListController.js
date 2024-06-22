const {
    cartListService,
    saveCartListService,
    updateCartListService,
    deleteCartListService
} = require("../backendService/CartListServices");


exports.saveCartList= async (req, res)=>{
    const result=await saveCartListService(req);
    return res.json(result);
}


exports.cartList= async (req, res)=>{
    const result=await cartListService(req);
    return res.json(result);
}



exports.updateCartList= async (req, res)=>{
    const result=await updateCartListService(req);
    return res.json(result);
}





exports.deleteCartList= async (req, res)=>{
    const result=await deleteCartListService(req);
    return res.json(result);
}
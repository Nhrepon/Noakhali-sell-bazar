const {
    wishListServices,
    saveWishListServices,
    removeWishListServices
}=require('../backendService/WishListServices');



exports.saveWishList=async (req, res)=>{
    const result=await saveWishListServices(req);
    return res.json(result);
}



exports.wishList=async (req, res)=>{
    const result=await wishListServices(req);
    return res.json(result);
}





exports.removeWishList=async (req, res)=>{
    const result=await removeWishListServices(req);
    return res.json(result);
}
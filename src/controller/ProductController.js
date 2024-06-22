const {
    brandListServices,
    categoryListServices,
    sliderListServices,
    listByBrandServices,
    listByCategoryServices,
    listByRemarksServices,
    listBySimilarProductsServices,
    detailService,
    listByKeywordServices,
    reviewListServices,
    createReviewServices,
    listByFilterServices
}=require("../backendService/ProductServices")




exports.productBrandList=async(req,res)=>{
    const result=await brandListServices(req);
    return res.json(result);
}




exports.productCategoryList=async(req,res)=>{
    const result=await categoryListServices(req);
    return res.status(200).json(result);
}




exports.productSliderList=async(req,res)=>{
    const result=await sliderListServices(req);
    return res.json(result);
}




exports.productListByBrand=async(req,res)=>{
    const result=await listByBrandServices(req);
    return res.json(result);
}





exports.productListByCategory=async(req,res)=>{
    const result=await listByCategoryServices(req);
    return res.json(result);
}



exports.productListBySimilar=async(req,res)=>{
    const result=await listBySimilarProductsServices(req);
    return res.json(result);
}




exports.productListByKeyword=async(req,res)=>{
    const result=await listByKeywordServices(req);
    return res.json(result);
}




exports.productListByRemark=async(req,res)=>{
    const result=await listByRemarksServices(req);
    return res.json(result);
}



exports.productListByFilter=async(req,res)=>{
    const result=await listByFilterServices(req);
    return res.json(result);
}




exports.productDetails=async(req,res)=>{
    const result=await detailService(req);
    return res.json(result);
}



exports.productReviewList=async(req,res)=>{
    const result=await reviewListServices(req);
    return res.json(result);
}



exports.createReview=async(req,res)=>{
    const result=await createReviewServices(req);
    return res.json(result);
}
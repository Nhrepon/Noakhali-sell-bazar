const BrandModel=require('../model/BrandModel');
const CategoryModel=require('../model/CategoryModel');
const ProductSliderModel=require('../model/ProductSliderModel');
const ProductModel=require('../model/ProductModel');
const ProductDetailModel=require('../model/ProductDetailModel');
const ReviewModel=require('../model/ReviewModel');
const mongoose=require('mongoose');
const { productDetails } = require('../controller/ProductController');

const ObjectId=mongoose.Types.ObjectId;



const brandListServices=async(req)=>{
    try {  
        const data=await BrandModel.find();
        return {status:"success", data:data}
    } catch (error) {
        return {status:"fail", data:error}
    }
}




const categoryListServices=async(req)=>{
    try {
        const data=await CategoryModel.find();
        return {status:"success", data:data}
    } catch (error) {
        return {status:"fail", data:error}
    }
}



const sliderListServices=async(req)=>{
    try {
        const data=await ProductSliderModel.find();
        return {status:"success", data:data}
    } catch (error) {
        return {status:"fail", data:error}
    }
}




const listByBrandServices=async(req)=>{
    try {
        const brandId=new ObjectId(req.params.brandId);
        
        const matchStage={$match:{brandId:brandId}};
        
        const joinStageWithBrand={$lookup:{
            from:"brands",
            localField:"brandId",
            foreignField:"_id",
            as:"brand"
        }}

        const joinStageWithCategory={$lookup:{
            from:"categories",
            localField:"categoryId",
            foreignField:"_id",
            as:"category"
        }}
        const unwindBrand={$unwind:"$brand"};
        const unwindCategory={$unwind:"$category"};
        const projectionStage={$project:{
            'brandId':0,
            'categoryId':0,
            'brand._id':0,
            'category._id':0,
            'brand.createdAt':0,
            'category.createdAt':0,
            'brand.updatedAt':0,
            'category.updatedAt':0

        }}
        const data=await ProductModel.aggregate(
            [
                matchStage,
                joinStageWithBrand,
                joinStageWithCategory,
                unwindBrand,
                unwindCategory,
                projectionStage
            ]
        );

        return {status:"success", data:data}
    } catch (error) {
        return {status:"fail", data:error}
    }
}




const listByCategoryServices=async(req)=>{
    try {
        const categoryId=new ObjectId(req.params.categoryId);
        const matchStage={$match:{categoryId:categoryId}};
        const joinStageWithCategory={$lookup:{
            from:"categories",
            localField:"categoryId",
            foreignField:"_id",
            as:"category"
        }}
        const joinStageWithBrand={$lookup:{
            from:"brands",
            localField:"brandId",
            foreignField:"_id",
            as:"brand"
        }}
        const unwindCategory={$unwind:"$category"};
        const unwindBrand={$unwind:"$brand"};
        const projectionStage={$project:{
            'brandId':0,
            'categoryId':0,
            'brand._id':0,
            'category._id':0,
            'brand.createdAt':0,
            'category.createdAt':0,
            'brand.updatedAt':0,
            'category.updatedAt':0
        }}
        const data=await ProductModel.aggregate(
            [
                matchStage,
                joinStageWithCategory,
                joinStageWithBrand,
                unwindCategory,
                unwindBrand,
                projectionStage

            ]
        );
        return {status:"success", data:data}
    } catch (error) {
        return {status:"fail", data:error}
    }
}





const listByRemarksServices=async(req)=>{
    try {
        const remark=req.params.remark;
        const matchStage={$match:{remark:remark}};
        const joinStageWithCategory={$lookup:{
            from:"categories",
            localField:"categoryId",
            foreignField:"_id",
            as:"category"
        }}
        const joinStageWithBrand={$lookup:{
            from:"brands",
            localField:"brandId",
            foreignField:"_id",
            as:"brand"
        }}
        const unwindCategory={$unwind:"$category"};
        const unwindBrand={$unwind:"$brand"};
        const projectionStage={$project:{
            'brandId':0,
            'categoryId':0,
            'brand._id':0,
            'category._id':0,
            'brand.createdAt':0,
            'category.createdAt':0,
            'brand.updatedAt':0,
            'category.updatedAt':0
        }}
        const data=await ProductModel.aggregate(
            [
                matchStage,
                joinStageWithCategory,
                joinStageWithBrand,
                unwindCategory,
                unwindBrand,
                projectionStage

            ]
        );
        return {status:"success", data:data}
    } catch (error) {
        return {status:"fail", data:error}
    }
}





const listBySimilarProductsServices=async(req)=>{
    try {
        const categoryId=new ObjectId(req.params.categoryId);
        const matchStage={$match:{categoryId:categoryId}};
        const limitStage={$limit:2};
        const joinStageWithCategory={$lookup:{
            from:"categories",
            localField:"categoryId",
            foreignField:"_id",
            as:"category"
        }}
        const joinStageWithBrand={$lookup:{
            from:"brands",
            localField:"brandId",
            foreignField:"_id",
            as:"brand"
        }}
        const unwindCategory={$unwind:"$category"};
        const unwindBrand={$unwind:"$brand"};
        const projectionStage={$project:{
            'brandId':0,
            'categoryId':0,
            'brand._id':0,
            'category._id':0,
            'brand.createdAt':0,
            'category.createdAt':0,
            'brand.updatedAt':0,
            'category.updatedAt':0
        }}
        const data=await ProductModel.aggregate(
            [
                matchStage,
                limitStage,
                joinStageWithCategory,
                joinStageWithBrand,
                unwindCategory,
                unwindBrand,
                projectionStage

            ]
        )
        return {status:"success", data:data}
    } catch (error) {
        return {status:"fail", data:error}
    }
}





const detailService=async(req)=>{
    try {
        const productId=new ObjectId(req.params.productId);
        const matchStage={$match:{_id:productId}}
        const joinStageWithBrand={$lookup:{
            from:"brands",
            localField:"brandId",
            foreignField:"_id",
            as:"brand"
        }}
        const joinStageWithCategory={$lookup:{
            from:"categories",
            localField:"categoryId",
            foreignField:"_id",
            as:"category"
        }}
        const joinWithDetailStage={$lookup:{
            from:"productdetails",
            localField:"_id",
            foreignField:"productId",
            as:"details"
        }}
        const unwindBrand={$unwind:"$brand"};
        const unwindCategory={$unwind:"$category"};
        const unwindDetails={$unwind:"$details"};
        const projectionStage={$project:{
            'brandId':0,
            'categoryId':0,
            'brand._id':0,
            'category._id':0,
            'details._id':0,
            'brand.createdAt':0,
            'category.createdAt':0,
            'brand.updatedAt':0,
            'category.updatedAt':0
        }}
        const data=await ProductModel.aggregate(
            [
                matchStage,
                joinStageWithBrand,
                joinStageWithCategory,
                joinWithDetailStage,
                unwindBrand,
                unwindCategory,
                unwindDetails,
                projectionStage
            ]
        );


        return {status:"success", data:data}
    } catch (error) {
        return {status:"fail", data:error}
    }
}






const listByKeywordServices=async(req)=>{
    try {

        const searchRegex={"$regex":req.params.keyword,"$options":"i"};
        const searchParams=[{title:searchRegex}, {description:searchRegex}];
        const searchQuery={$or:searchParams}
        const matchStage={$match:searchQuery};

        const joinStageWithCategory={$lookup:{
            from:"categories",
            localField:"categoryId",
            foreignField:"_id",
            as:"category"
        }}
        const joinStageWithBrand={$lookup:{
            from:"brands",
            localField:"brandId",
            foreignField:"_id",
            as:"brand"
        }}
        const unwindCategory={$unwind:"$category"};
        const unwindBrand={$unwind:"$brand"};
        const projectionStage={$project:{
            'brandId':0,
            'categoryId':0,
            'brand._id':0,
            'category._id':0

        }}
        const data=await ProductModel.aggregate(
            [
                matchStage,
                joinStageWithCategory,
                joinStageWithBrand,
                unwindCategory,
                unwindBrand,
                projectionStage

            ]
        )
        return {status:"success", data:data}
    } catch (error) {
        return {status:"fail", data:error}
    }

}






const reviewListServices=async(req)=>{
  try {
    const productId=new ObjectId(req.params.productId);
    const matchStage={$match:{productId:productId}};
    const joinStageWithProfile={$lookup:{
      from:"profiles",
      localField:"userId",
      foreignField:"userId",
      as:"profile"
    }};
    const unwindProfile={$unwind:"$profile"};
    const projectionStage={$project:{
        'profile.userName':1,
        'description':1,
        'rating':1
    }};
    const data=await ReviewModel.aggregate(
      [
        matchStage,
        joinStageWithProfile,
        unwindProfile,
        projectionStage
      ]
    )
    return {status:"success", data:data}
  } catch (error) {
    return {status:"fail", data:error}
  }
            
}





const createReviewServices=async(req)=>{
  try {
    const {userId}=req.headers;
    const review=req.body;
    review.userId=userId;
    const data=await ReviewModel.create(review);
    return {status:"success", data:data}
  } catch (error) {
    return {status:"fail", data:error}
  }
}







const listByFilterServices=async(req)=>{
  try {
    const matchCondition={};
    if(req.body['categoryId']){matchCondition.categoryId=new ObjectId(req.body['categoryId'])}
    if(req.body['brandId']){matchCondition.brandId=new ObjectId(req.body['brandId'])}
    const matchStage={$match:matchCondition};
    const addFieldsStage={$addFields:{
        numericPrice:{$toInt:"$price"}
    }};

    const priceMin=parseInt(req.body['priceMin']);
    const priceMax=parseInt(req.body['priceMax']);
    const priceMatchCondition={};
    if(!isNaN(priceMin)){
      priceMatchCondition['numericPrice']={$gte:priceMin}
    }
    if(!isNaN(priceMax)){
        priceMatchCondition['numericPrice']={...(priceMatchCondition['numericPrice'] || {}), $lte:priceMax};
    }
    const priceMatchStage={$match:priceMatchCondition};
    const joinStageWithBrand={$lookup:{
        from:"brands",
        localField:"brandId",
        foreignField:"_id",
        as:"brand"
    }}
    const joinStageWithCategory={$lookup:{
        from:"categories",
        localField:"categoryId",
        foreignField:"_id",
        as:"category"
    }}
    const unwindBrand={$unwind:"$brand"};
    const unwindCategory={$unwind:"$category"};
    const projectionStage={$project:{
        'brandId':0,
        'categoryId':0,
        'brand._id':0,
        'category._id':0    
    }}
    const data=await ProductModel.aggregate(
      [
        matchStage,
        addFieldsStage,
        priceMatchStage,
        joinStageWithBrand,
        joinStageWithCategory,
        unwindBrand,
        unwindCategory,
        projectionStage

      ] 
    )

    return {status:"success", data:data}
  } catch (error) {
    return {status:"fail", data:error}
  }
}




module.exports={
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
}
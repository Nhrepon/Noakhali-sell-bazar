const WishModel=require('../model/WishModel');
const mongoose=require('mongoose');
const ObjectId=mongoose.Types.ObjectId;






////////////////
const saveWishListServices=async (req)=>{
    try {
        const userId=new ObjectId(req.headers.userId);
        const reqBody=req.body;
        reqBody.userId=userId;
        const data= await WishModel.updateOne(reqBody, {$set:reqBody}, {upsert:true});
        return {status:"success", data:data};
    } catch (error) {
        return {status:"failed", message:error}
    }
}






/////////////
const wishListServices=async (req)=>{
try {
    const userId=new ObjectId(req.headers.userId);
    const matchStage={$match:{userId:userId}}; 

    const joinStageWithProduct={$lookup:
            {
                from:"products",
                localField:"productId",
                foreignField:"_id",
                as:"product"
            }
        }
          
        const joinStageWithBrand={$lookup: 
            {
                from:"brands",
                localField:"product.brandId",
                foreignField:"_id",
                as:"brand"
            }
        }

        const joinStageWithCategory={$lookup:
            {
                from:"categories",
                localField:"product.categoryId",
                foreignField:"_id",
                as:"category"
            }
        } 

        const unwindProduct={$unwind:"$product"}
        const unwindBrand={$unwind:"$brand"}
        const unwindCategory={$unwind:"$category"}



        const data=await WishModel.aggregate(
            [
                matchStage,
                joinStageWithProduct,
                joinStageWithBrand,
                joinStageWithCategory,
                unwindProduct,
                unwindBrand,
                unwindCategory
                
            ]
        )

        return {status:"success", data:data};
} catch (error) {
    return {status:"Failed", message:error}
}
}




////////////////
const removeWishListServices=async (req)=>{
    try {
        const userId=new ObjectId(req.headers.userId);
        const reqBody=req.body;
        reqBody.userId=userId;
        const data=await WishModel.deleteOne(reqBody);
        return {status:"success", data:data};
    } catch (error) {
        return {status:"Failed", message:error}
    }
}



module.exports={
    wishListServices,
    saveWishListServices,
    removeWishListServices
}
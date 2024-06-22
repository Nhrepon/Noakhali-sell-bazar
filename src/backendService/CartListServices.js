const { saveCartList } = require('../controller/CartListController');
const CartModel = require('../model/CartModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const saveCartListService = async (req) => {
    try {
        const userId=new ObjectId(req.headers.userId);
        const reqBody=req.body;
        reqBody.userId=userId;
        const data=await CartModel.create(reqBody);
        return {status:"Success", data:data};
    } catch (error) {
        return {status:"Failed", message:error};
    }
}




const cartListService = async (req) => {
    try {
        const userId=new ObjectId(req.headers.userId);

        const matchStage={$match:{userId:userId}};
        const joinStageWithProduct={$lookup:{
            from:"products",
            localField:"productId",
            foreignField:"_id",
            as:"product"
        }};
        const joinStageWithBrand={$lookup:{
            from:"brands",
            localField:"product.brandId",
            foreignField:"_id",
            as:"brand"
        }};
        const joinStageWithCategory={$lookup:{
            from:"categories",
            localField:"product.categoryId",
            foreignField:"_id",
            as:"category"
        }};
        const unwindProduct={$unwind:"$product"};
        const unwindBrand={$unwind:"$brand"};
        const unwindCategory={$unwind:"$category"};

        const projectionStage={$project:{
            '_id':0,
            'productId':0,
            'brandId':0,
            'categoryId':0,
            'product.categoryId':0,
            'product.brandId':0,
            'product.createdAt':0,
            'product.updatedAt':0,
            'brand.createdAt':0,
            'category.createdAt':0,
            'brand.updatedAt':0,
            'category.updatedAt':0,
            'brand._id':0,
            'category._id':0


        }};

        const data=await CartModel.aggregate([
            matchStage,
            joinStageWithProduct,
            joinStageWithBrand,
            joinStageWithCategory,
            unwindProduct,
            unwindBrand,
            unwindCategory,
            projectionStage

        ]);
        return {status:"Success", data:data};
    } catch (error) {
        return {status:"Failed", message:error};
    }
}






const updateCartListService = async (req) => {
    try {
        const userId=new ObjectId(req.headers.userId);
        const cartId=req.params.cartId;
        const reqBody=req.body;
        const data=await CartModel.updateOne({_id:cartId, userId:userId}, reqBody);
        return {status:"Success", data:data};
    } catch (error) {
        return {status:"Failed", message:error};
    }
}





const deleteCartListService = async (req) => {
    try {
        const userId=new ObjectId(req.headers.userId);
        const reqBody=req.body;
        reqBody.userId=userId;
        const data=await CartModel.deleteOne(reqBody);
        return {status:"Success", data:data};
    } catch (error) {
        return {status:"Failed", message:error};
    }
}




module.exports={
    cartListService,
    saveCartListService,
    updateCartListService,
    deleteCartListService
}
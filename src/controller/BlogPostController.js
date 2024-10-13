const BlogPostModel = require("../model/BlogPostModel");
const mongoose = require('mongoose');

exports.blogPostList = async (req, res)=>{
    try {

        const joinStageWithUser={$lookup:{
            from:"users",
            localField:"userId",
            foreignField:"_id",
            as:"user"
        }}
        const unwindUser={$unwind:"$user"};

        const joinStageWithCategory={$lookup:{
            from:"categories",
            localField:"categoryId",
            foreignField:"_id",
            as:"category"
        }}
        const unwindCategory={$unwind:"$category"};

        const projectionStage={$project:{
            
            'category._id':0,
            'user.password':0   
        }};

        const data = await BlogPostModel.aggregate(
           [
            joinStageWithUser,
            unwindUser,
            joinStageWithCategory,
            unwindCategory,
            projectionStage
           ]
            );

        res.json({status:"success", data:data});
    } catch (error) {
        res.json({status:"failed", message:error});
    }
}


exports.blogPostCreate = async (req, res)=>{
    try {
        const userId = req.headers.userId;
        const reqBody = req.body;
        reqBody.userId = userId;
        const blogPost = await BlogPostModel.create(reqBody);
        res.json({status:"success", data:blogPost});
        
    } catch (error) {
        res.json({status:"failed", message:error});
    }
}
const FeaturesModel = require('../model/FeaturesModel');
const LegalModel = require('../model/LegalModel');



const featuresListServices=async(req)=>{
    try {
        const data=await FeaturesModel.find();
        return {status:"success", data:data}
    } catch (error) {
        return {status:"failed", message:error}
    }
}






const legalDetailsServices=async(req)=>{
    try {
        const type=req.params.type;
        const data=await LegalModel.find({type:type});
        return {status:"success", data:data}
    } catch (error) {
        return {status:"failed", message:error}
    }
}



module.exports={
    featuresListServices,
    legalDetailsServices
}
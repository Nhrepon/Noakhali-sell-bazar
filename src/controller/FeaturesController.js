const {featuresListServices, legalDetailsServices}=require('../backendService/FeaturesServices');


exports.featureList= async (req, res)=>{
    const result=await featuresListServices(req);
    return res.json(result);
}



exports.legalDetails= async (req, res)=>{
    const result=await legalDetailsServices(req);
    return res.json(result);
}
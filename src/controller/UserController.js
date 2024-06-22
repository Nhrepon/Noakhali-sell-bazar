const UserModel = require("../model/UserModel");

const {
    userOtpService,
    verifyOtpService,
    saveProfileService,
    readProfileService
}=require("../backendService/UserServices");


exports.userOtp= async (req, res)=>{
    const result=await userOtpService(req);
    return res.json(result);
}


exports.verifyLogin= async (req, res)=>{
    const result=await verifyOtpService(req);
    if(result.status==="success"){
        const cookieOption={expires:new Date(Date.now()+30*24*60*60*1000), httpOnly:false}; 
        res.cookie('token', result.token, cookieOption);
        return res.json(result);
    }else{
        return res.json(result);
    }
    
}



exports.userLogout= async (req, res)=>{
    const cookieOption={expires:new Date(Date.now()-30*24*60*60*1000), httpOnly:true};
    res.cookie('token', '', cookieOption);
    //res.clearCookie('token');
    res.status(200).json({status:"success", data:"Logged out successfully"});
}



exports.userRegistration= async (req, res)=>{
    try {
        const reqBody=req.body;
        const data=await UserModel.create(reqBody);
        res.status(200).json({status:"success", data:data});
    } catch (error) {
        res.status(400).json({status:"failed", data:error});
    }
}




exports.userProfileRead= async (req, res)=>{
    const result=await readProfileService(req);
    return res.json(result);
}




exports.userProfileUpdate= async (req, res)=>{
    const result=await saveProfileService(req);
    return res.json(result);
}




/////////////////////
exports.userProfileDelete= async (req, res)=>{
    try {
        res.status(200).json({status:"Success", data:"{data}"});
    } catch (error) {
        res.status(400).json({status:"Failed", data:"error"});
    }
}




exports.userLogin= async (req, res)=>{
    try {
        res.status(200).json({status:"Success", data:"{data}"});
    } catch (error) {
        res.status(400).json({status:"Failed", data:"error"});
    }
}




exports.userVerify= async (req, res)=>{
    try {
        res.status(200).json({status:"Success", data:"{data}"});
    } catch (error) {
        res.status(400).json({status:"Failed", data:"error"});
    }
}
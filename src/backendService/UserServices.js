const sendEmail=require('../utility/EmailHelper');
const TokenHelper=require('../utility/TokenHelper');
const UserModel=require('../model/UserModel');
const ProfileModel=require('../model/ProfileModel');
const OtpModel = require('../model/OtpModel');


///////////////
const userOtpService=async(req)=>{
    try {
        const {email}=req.params;
        const code=Math.floor(100000 + Math.random()*900000);
        const emailText=`Your verification code is ${code}`;
        const emailSubject="Email verification code";
        await sendEmail(email, emailSubject, emailText);
        const user=await UserModel.find({email:email});
        if(user.length>0){
            const data=await OtpModel.updateOne({email:email, userId:user[0]._id}, {$set:{otp:code}}, {upsert:true});
            return {status:"success", data:data};
        }else{
            const user=await UserModel.create({email:email});

            const profile=await ProfileModel.create({userId:user._id, userName:email});

            const data=await OtpModel.updateOne({email:email, userId:user._id}, {$set:{otp:code}}, {upsert:true});
            return {status:"success", data:data, profile:profile, user:user};
        }
        
        
    } catch (error) {
        return {status:"fail", message:error};
    }
}


////////////////
const verifyOtpService=async(req)=>{
    try {
        const {email, otp}=req.params;
        const total=await OtpModel.find({email:email, otp:otp});
        if(total.length>0){
            const userId=total[0].userId;
            const token=TokenHelper.encodeToken(email, userId);
            await OtpModel.updateOne({email:email, otp:otp}, {$set:{otp:" "}});
            return {status:"success", token:token};
        }else{
            return {status:"fail", data:"invalid otp"};
        }
        
    } catch (error) {
        return {status:"fail", data:error};
    }
}


//////////////////
const saveProfileService=async(req)=>{
    try {
        const userId=req.headers.userId;
        const reqBody=req.body;
        reqBody.userId=userId;
        const data=await ProfileModel.updateOne({userId:userId},{$set:reqBody}, {upsert:true});
        
        return {status:"success", data:data};
    } catch (error) {
        return {status:"fail", data:error};
    }
}



/////////////////
const readProfileService=async(req)=>{
    try {
        const {userId}=req.headers;
        const data=await ProfileModel.findOne({userId:userId});
        return {status:"success", data:data};
    } catch (error) {
        return {status:"fail", data:error};
    }
}




module.exports={
    userOtpService,
    verifyOtpService,
    saveProfileService,
    readProfileService
}


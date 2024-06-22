const jwt=require('jsonwebtoken');
const { decodeToken } = require('../utility/TokenHelper');

const AuthMiddleware=(req, res, next)=>{
    
    try {
    const token=req.cookies['token'];

    const decode=decodeToken(token);

    if(decode===null){
        return res.status(401).json({status:"fail", message:"invalid token"});
    }else{
        const {email, userId}=decode;
        req.headers.email=email;
        req.headers.userId=userId;
        next();
    }
        
    } catch (error) {
        
        return res.json({status:"fail", message:"error", error:error});
    }
}


module.exports=AuthMiddleware;
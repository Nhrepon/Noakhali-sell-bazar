const jwt=require('jsonwebtoken');

exports.encodeToken=(email, userId)=>{
    const payload={email:email, userId:userId};
    //const payload={exp:Math.floor(Date.now()/1000)+(60*60*72),data:{email:email, userId:userId}};
    const key=process.env.TOKEN_KEY;
    const expireTime={expiresIn:"72h"};
    return jwt.sign(payload, key, expireTime);
}



exports.decodeToken=(token)=>{
    try {
        const key=process.env.TOKEN_KEY;
        return jwt.verify(token, key);
    } catch (error) {
        return error;
    }
}
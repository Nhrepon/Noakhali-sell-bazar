
const mongoose=require('mongoose');

const databaseSchema=mongoose.Schema({
    email:{type:String, required:true, lowercase:true, unique:true},
    firstName:{type:String,},
    lastName:{type:String,},
    userName:{type:String,},
    age:{type:String},
    gender:{type:String},
    mobile:{type:String},
    password:{type:String,}
    
},{timestamps:true, versionKey:false});

const UserModel=mongoose.model('users', databaseSchema);
module.exports=UserModel;
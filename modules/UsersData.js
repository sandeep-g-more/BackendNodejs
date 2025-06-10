import mongoose from "mongoose";

const userSchemaData=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    }
},{timestamps:true})

const UserData = mongoose.model('UserData', userSchemaData);
export default UserData;
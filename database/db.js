import mongoose from 'mongoose';
import dotenv from  'dotenv';
dotenv.config()


export const connectionDB = async () => {
    return await mongoose.connect(process.env.MONGO_DB).then((res) => {
        console.log('mongodb connect')
    }).catch((err) => {
        console.log('err', err)
    })
}
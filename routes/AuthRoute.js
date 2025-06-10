import express from "express"
import { LoginUser, RegisterUser } from "../controllers/users.js";

const app=express();
const authRoute=express.Router();
// RegisterUser,LoginUser
authRoute.post('/register',RegisterUser);
authRoute.post('/login',LoginUser)

export default authRoute;  //exporting the router
import express from "express"
import { LoginUser, LogoutUser, RefreshToken, RegisterUser ,getAllUsers} from "../controllers/users.js";

const app=express();
const authRoute=express.Router();
// RegisterUser,LoginUser
authRoute.post('/register',RegisterUser);
authRoute.post('/login',LoginUser)
authRoute.post('/token', RefreshToken);
authRoute.post('/logout', LogoutUser);
authRoute.get('/getAllUsers',getAllUsers)
export default authRoute;  //exporting the router
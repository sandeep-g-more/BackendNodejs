import UserData from '../modules/UsersData.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//  controller for registering the users
const RegisterUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await UserData.findOne({ email });
        if (userExist) res.status(400).json({ msg: "Use already exists" })
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser = new UserData({ email, password: hashPassword })
        console.log("nw user",newUser)
        await newUser.save();
        res.json({ msg: "User created successfully" })
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message })
    }


}
// 

const LoginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserData.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" })
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" })
        res.json({ token });
    } catch (error) {
res.status(500).json({ msg: "Server error", error: error.message })
    }

    // res.json({token})
    // }   

}


export { RegisterUser, LoginUser }
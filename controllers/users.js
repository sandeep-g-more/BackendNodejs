import UserData from "../modules/UsersData.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const refreshTokenArray = []; // temp  array to store the tokens

//  controller for registering the users

const getAllUsers=async(req,res)=>{
  try {
        const users = await UserData.find({});
        res.json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ error: 'Failed to fetch users.' });
    }
}

const RegisterUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await UserData.findOne({ email });
        if (userExist) res.status(400).json({ msg: "Use already exists" });
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new UserData({ email, password: hashPassword });
        console.log("nw user", newUser);
        await newUser.save();
        res.json({ msg: "User created successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};
//

const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserData.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "15min",
        });
        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "2h" }
        );
        refreshTokenArray.push(refreshToken);
        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }

    // res.json({token})
    // }
};

//Refresh Token

const RefreshToken = async (req, res, next) => {
    const { token } = req?.body;
    if (!token) return res.status(401).json({ msg: "no token is provided" });
    if (!refreshTokenArray.includes(token)) {
        return res.status(403).json({ msg: "Invalid refresh token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "15min"
        });
        res.json({ accessToken })
    } catch (error) {
        return res.status(403).json({ msg: "Invalid token", error: error.message });
    }
};

const LogoutUser = async (req, res) => {
    const { token } = req.body;
    const index = refreshTokenArray.indexOf(token);
    if (index > -1) {
        refreshTokenArray.splice(index, 1)
    }
    res.json({ msg: "Logged out successfully" })
}

export { RegisterUser, LoginUser, refreshTokenArray, LogoutUser, RefreshToken,getAllUsers };

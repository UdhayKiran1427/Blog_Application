const User = require('../model/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const generateToken =  (user) => {
    return jwt.sign({id: user._id},process.env.JWT_SECRET, {expiresIn: "7days"})
}
const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }
    const userexists = await User.findOne({email});
    if(userexists){
        res.status(400)
        throw new Error("Email already exists");
    }
    const user = new User({email,password});
    await user.save();
    res.status(201).json({message: "User created successfully"});
    } catch (error) {
        res.status(500).json({Error: error.message});
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        const userexists = await User.findOne({email});
        if(!userexists){
            return res.status(500).json({message: "User not found"});
        }
        if(userexists && (await bcrypt.compare(password,userexists?.password))){
            return res.status(200).json({message: "Login successful", token: generateToken(userexists)});
        }else{
            return res.status(400).json({message: "Incorrect Email or password"});
        }
    } catch (error) {
        res.status(400);
        throw new Error("Invaild Email or Password");
    }

}

module.exports = {register, login};
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login user
const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({status: false,message:"Can not find user"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({status: false,message:"Invalid password"})
        }
        const token = createToken(user._id)

        return res.json({status: true,token})
    } catch (error) {
        console.log(error)
        return res.json({status: false,message:"ERROR"})
    }
}

const createToken = (id) => {
    return jwt.sign({ id },process.env.JWT_SECRET)
}

//register user
const registerUser = async (req,res)=>{
    const  {name,password,email} = req.body;
    try {
        // checking is user already exit
        const exits = await userModel.findOne({email})
        if(exits){
            return res.json({success:false,message:"User already exit"})
        }

        //Validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid Email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Please enter strong password"})
        }

        // hashing user password

        const salt = await bcrypt.genSalt(10) // range 5-15
        const hashedPassword = await bcrypt.hash(password,salt)
        
        // new user

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        //saved new user in database
        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success:true,token});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"ERROR"})
        return jwt.sign({ id }, process.env.JWT_SECRET)
    }
}

export { loginUser,registerUser }
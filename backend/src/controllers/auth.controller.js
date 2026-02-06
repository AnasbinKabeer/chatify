import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import  {generateToken}  from "../lib/utils.js";

export const signup = async (req, res) => { 
    const {fullname, email, password } = req.body;
    console.log("signup is running")

    try {
        if(!fullname || !email || !password){
        return res.status(400).json({message: "All fields are required"});
    }

    if(password.length < 6){
        return res.status(400).json({message: "Password must be at least 6 characters long"});
    }

    // check if email valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        return res.status(400).send({message: "Invalid email format "})
    }

    const user = await User.findOne({email});
    if(user){
        return res.status(400).send({message: "User already exists"});
    }

    // hash password
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = new User({
        fullname,
        email,
        password: hashedPassword
    })

    if(newUser){
        generateToken(newUser._id, res);
        await newUser.save();
        res.status(201).json({message: "User created successfully",
            user: {
                id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                password: newUser.password,
                profilePic: newUser.profilePic
            }
        });

        /// welcome email by Resend
        
    }

        
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }

};


export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        //validate
        if(!email || !password){
            res.status(400).send({message: "All fields are required"})
        }




        
    } catch (error) {
        
    }
};

export const logout = async (req, res) => {
    console.log("Logout");
};

import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


{/* ----------------------------------
   REGISTER USER: /api/user/register
----------------------------------------*/}

export const registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){  //if the name, email and password not found they show error
            return res.status(400).json({message: "All fields are required", success: false});
        }

        // If user email already exits so print the return
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User Already exists", success: false});
        }

        // if the website hack so the hackUser do not access the password using the hash
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a User
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword,
        });


        // Token generate for user because I use for token in frontend and I check is the user is real or not using the token verify and I use for JWT_SECRET because our token is always secret and the token inside a .env file 
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.cookie("token", token, {
            //httpOnly we prevent the Javascript do not access the token
            httpOnly: true, 
            
            //if node environment == production so the secure is true otherwise false and they secure cookies in production
            secure: process.env.NODE_ENV == "production", 

            //help prevent CSRF attacks
            sameSite: process.env.NODE_ENV == "production" ? "none" : "Strict", 

            //calculate the days:- 7 days, 1 day = 24 hours, 1 hours = 60 minutes, 1 minutes = 60 seconds, 1 seconds = 1000ms
            maxAge: 7 * 24 * 60 * 60 * 1000,   
        });

        res.json({
            message: "User registered successfully",
            success: true,
            user: {
                name: user.name,
                email: user.email,
            },
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}



{/* ---------------------------
   LOGIN USER: /api/user/login
--------------------------------*/}

export const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){   //if the email and password not found they show error
            return res.status(400).json({message: "All fields are required", success: false});
        }

        // If user already exits so print the return
        const user = await User.findOne({email});
        if(!user){  //if user not find they return
            return res.status(400).json({message: "Invalid email or password", success: false});
        }

        // if user already exists so firstly compare the password and user.password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){  //if password not match
            return res.status(400).json({message: "Invalid email or password", success: false});
        }

        // if the password match so generate the token
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.cookie("token", token, {
            //httpOnly we prevent the Javascript do not access the token
            httpOnly: true, 
            
            //if node environment == production so the secure is true otherwise false and they secure cookies in production
            secure: process.env.NODE_ENV == "production", 

            //help prevent CSRF attacks
            sameSite: process.env.NODE_ENV == "production" ? "none" : "Strict",

            //calculate the days:- 7 days, 1 day = 24 hours, 1 hours = 60 minutes, 1 minutes = 60 seconds, 1 seconds = 1000ms
            maxAge: 7 * 24 * 60 * 60 * 1000,   
        });

        res.json({
            message: "logged in successfully",
            success: true,
            user: {
                name: user.name,
                email: user.email,
            },
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}




{/* ---------------------------
   LOGOUT USER: /api/user/logout
--------------------------------*/}

export const logOutUser = async(req, res) => {
    try {
        res.clearCookie("token", {
            //httpOnly we prevent the Javascript do not access the token
            httpOnly: true, 
            
            //if node environment == production so the secure is true otherwise false and they secure cookies in production
            secure: process.env.NODE_ENV == "production", 

            //help prevent CSRF attacks
            sameSite: process.env.NODE_ENV == "production" ? "none" : "Strict",
        });

        res.json({
            message: "User logged out successfully",
            success: true,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}




{/* ------------------------------------------------------
   CHECK USER IS AUTHENTICATE OR NOT: /api/user/check-auth
-----------------------------------------------------------------*/}

export const isAuthUser = async(req, res) => {
    try {
        const userId = req.user;
        if(!userId){
           return res.status(401).json({message: "Unauthorized", success: false});
        }

        // check only email and name for the user not check password
        const user = await User.findById(userId).select("-password");
        res.json({
            success: true,
            user,
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}






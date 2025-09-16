import jwt from 'jsonwebtoken'

// check is the user already login or not
export const authUser = (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token){  // if user token not found they show the error
            return res.status(401).json({message: "Unauthorized", success: false});
        }

        // is the user token found
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
        
    } catch (error) {
        console.log("Authentication error:" ,error);
        res.status(401).json({message: "Unauthorized", success: false});
    }
}
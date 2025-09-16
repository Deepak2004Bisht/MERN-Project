import jwt from 'jsonwebtoken'


// check is the seller already login or not
export const authSeller = (req, res, next) => {
    try {
        const {sellerToken} = req.cookies;
        if(!sellerToken){  // if seller token not found they show the error
            return res.status(401).json({message: "Unauthorized", success: false});
        }

        // is the seller token found
        const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
        if(decoded.email == process.env.SELLER_EMAIL){
            next();
        }
        
    } catch (error) {
        console.log("Authentication error:" ,error);
        res.status(401).json({message: "Unauthorized", success: false});
    }
}
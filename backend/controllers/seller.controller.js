import jwt from "jsonwebtoken";

{
  /* ----------------------------------
    SELLER LOGIN:- /api/seller/login
--------------------------------------------*/
}

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email == process.env.SELLER_EMAIL &&
      password == process.env.SELLER_PASSWORD
    ) {
        //generate token and store the cookies
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("sellerToken", token, {
          //httpOnly we prevent the Javascript do not access the token
          httpOnly: true,

          //if node environment == production so the secure is true otherwise false and they secure cookies in production
          secure: process.env.NODE_ENV == "production",

          //help prevent CSRF attacks
          sameSite: process.env.NODE_ENV == "production" ? "none" : "Strict",

          //calculate the days:- 7 days, 1 day = 24 hours, 1 hours = 60 minutes, 1 minutes = 60 seconds, 1 seconds = 1000ms
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      res.status(200).json({ message: "Login successful", success: true });
    }
  } catch (error) {
    console.log("Error in sellerLogin:", error);
    req.status(500).json({ message: "Internal server error" });
  }
};



{
/* ----------------------------------
    SELLER LOGOUT:- /api/seller/logout
--------------------------------------------*/
}

export const sellerLogout = async(req, res) =>{
    try {
        res.clearCookie("sellerToken", {
            //httpOnly we prevent the Javascript do not access the token
            httpOnly: true, 
            
            //if node environment == production so the secure is true otherwise false and they secure cookies in production
            secure: process.env.NODE_ENV == "production", 

            //help prevent CSRF attacks
            sameSite: process.env.NODE_ENV == "production" ? "none" : "Strict",
        });

        res.json({
            message: "Seller logged out successfully",
            success: true,
        });

    } catch (error) {
        console.log("Error in sellerLogout:" , error);
        res.status(500).json({message: "Internal server error"});
    }
}



{/* ------------------------------------------------------
   CHECK SELLER IS AUTHENTICATE OR NOT: /api/seller/is-auth
-----------------------------------------------------------------*/}

export const isAuthSeller = async(req, res) => {
    try {
        res.status(200).json({
            success: true,
        })

    } catch (error) {
        console.log("Error in isAuthSeller:" , error);
        res.status(500).json({message: "Internal server error"});
    }
}



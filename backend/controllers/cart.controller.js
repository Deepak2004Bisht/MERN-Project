import User from "../models/user.model.js";


{/* ----------------------------------
    UPDATE USER CARTDATA:- /api/cart/update
--------------------------------------*/}

export const updateCart = async(req, res) => {
    try {
        const userId = req.user;
        const {cartItems} = req.body;
        const updateUser = await User.findByIdAndUpdate(
            userId, 
            {cartItems}, 
            {new: true}
        );
        if(!updateUser){
            return res.status(404).json({message: "User not found", success: false});
        }
        res.status(200).json({updateUser, success: true, message: "Cart updated Successfully"});
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
}











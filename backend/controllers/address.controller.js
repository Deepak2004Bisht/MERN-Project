import Address from "../models/address.model.js";


{/* --------------------------------------
  ADD ADDRESS:- /api/address/add
-----------------------------------------*/}

export const addAddress = async (req, res) => {
  try {
   const userId = req.user;
   const {address} = req.body;
   
   await Address.create({
    ...address,
    userId
   });

   res.status(201).json({
    message: "Address added successfully",
    success: true,
   });

  } catch (error) {
    console.log("Error adding address:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



{/* --------------------------------------
  GET ADDRESS:- /api/address/get
-----------------------------------------*/}

export const getAddress = async (req, res) => {
    try {
     const userId = req.user;
     const addresses = await Address.find({userId}).sort({createdAt: -1});

     res.status(201).json({
      success: true,
      addresses,
     });

    } catch (error) {
      console.log("Error fetching address:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
};





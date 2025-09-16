import Order from "../models/order.model.js";
import Product from "../models/product.model.js";



{/* --------------------------------------
   PLACE ORDER COD:- /api/order/cod
-----------------------------------------*/}

export const placeOrderCOD = async(req, res)=>{
   try {
      const userId = req.user;
      const {items, address} = req.body;
      if(!items || !address){
         return res.status(400).json({message: "Items and address are required", success: false});
      }

      // Calculate total amount
      let amount = await items.reduce(async(acc, item) => {
         const product = await Product.findById(item.product);
         return (await acc) + product.offerPrice * item.quantity;
      }, 0);


      // Add tax charges 2%
      amount += Math.floor((amount * 2)/100);

      // Create a Order
      await Order.create({
         userId,
         items,
         address,
         amount,
         paymentType: "COD",
         isPaid: false,
      })

     res
      .status(201)
      .json({ message: "Order placed successfully", success: true });

   } catch (error) {
      console.log("Error placing order: ", error);
      req.status(500).json({message: "Internal server error"});
   }
}


{/* ------------------------------------------------
   ORDER DETAILS FOR INDIVIDUAL USER:- /api/order/user
-------------------------------------------------------*/}

export const getUserOrders = async(req, res) => {
   try {
      const userId = req.user;
      const orders = await Order.find({
         userId,
         $or: [{paymentType: "COD"}, {isPaid: true}]
      }).populate("items.product address").sort({createdAt: -1});

      res.status(200).json({success: true, orders});

   } catch (error) {
      console.log("Error fetching user order: ", error);
      req.status(500).json({message: "Internal server error"});
   }
}



{/* ------------------------------------------------
  GET ALL ORDERS FOR ADMIN:- /api/order/seller
-------------------------------------------------------*/}

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: false }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });

  } catch (error) {
    console.log("Error fetching admin order: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};





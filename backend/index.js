import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB.js';
dotenv.config();

import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import addressRoutes from './routes/address.routes.js'
import { connectCloudinary } from './config/cloudinary.js';


const app = express();

connectDB(); //Call from mongoDB connection from connectDB.js

connectCloudinary();  //Connect cloudinary from cloudinary.js

const allowedOrigins = [
    "http://localhost:5173",
    "https://mern-project-1-p94d.onrender.com"
];


{/* ---------------------------
    MIDDLEWARES
----------------------------*/}


// Isse ham data json ke format mai le sakhenge
app.use(express.json());
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.options('*', cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());



{/* ---------------------------
   API ENDPOINTS
----------------------------*/}

app.use("/images", express.static("uploads"));

// if user go to the /api/user so user redirect to the user.routes.js file
app.use("/api/user", userRoutes);

// if user go to the /api/seller so user redirect to the seller.routes.js file
app.use("/api/seller", sellerRoutes);

// if user go to the /api/product so user redirect to the product.routes.js file
app.use("/api/product", productRoutes);

// if user go to the /api/cart so user redirect to the cart.routes.js file
app.use("/api/cart", cartRoutes);

// if user go to the /api/order so user redirect to the order.routes.js file
app.use("/api/order", orderRoutes);

// if user go to the /api/address so user redirect to the address.routes.js file
app.use("/api/address", addressRoutes);




const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})

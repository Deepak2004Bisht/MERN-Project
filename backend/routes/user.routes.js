import express from 'express'
import { isAuthUser, loginUser, logOutUser, registerUser } from '../controllers/user.controller.js';
import { authUser } from '../middlewares/authUser.js';

const router = express.Router();

// to store the data using post method
router.post("/register", registerUser);
router.post("/login", loginUser);

//logOut user using get method
router.get("/logout", authUser, logOutUser);
router.get("/is-auth", authUser, isAuthUser);





export default router;
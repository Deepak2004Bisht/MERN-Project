import express from 'express'
import { authSeller } from '../middlewares/authSeller.js';
import { upload } from '../config/multer.js';
import { addProduct, changeStock, getProductById, getProducts } from '../controllers/product.controller.js';

const router = express.Router();

// Product add
router.post('/add-product', authSeller, upload.array('image'), addProduct);

// Product list
router.get('/list', getProducts);

// Product id
router.get('/id', getProductById);

// Product Stock
router.post('/stock', authSeller, changeStock);





export default router;
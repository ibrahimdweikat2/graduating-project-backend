import express from 'express';
import {getCategoriesByName,createCategories,deleteCategories,updateCategories} from '../Controllers/categoriesControllers.js';
import {verifyTokenAndAdmin} from '../Middleware/userMiddleWare.js';
const router = express.Router();

router.post('/addCategories',createCategories);
router.get('/:title',getCategoriesByName);
router.delete('/delete/:id',verifyTokenAndAdmin,deleteCategories);
router.put('/update/:id',verifyTokenAndAdmin,updateCategories);

export default router;
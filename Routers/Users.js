import express from 'express';
import {verifyTokenAndAdmin,verifyTokenAndAuthorization} from '../Middleware/userMiddleWare.js';
import {getUser,getUsers,deleteUser,updateUser,getStatus} from '../Controllers/userControllers.js'
const router = express.Router();

    router.get('/find/:id',verifyTokenAndAdmin,getUser);
    router.get('/',verifyTokenAndAdmin,getUsers);
    router.delete('/delete/:id',verifyTokenAndAdmin,deleteUser);
    router.patch('/update/:id',verifyTokenAndAuthorization,updateUser);
    router.get('/status',verifyTokenAndAdmin,getStatus);

export default router;
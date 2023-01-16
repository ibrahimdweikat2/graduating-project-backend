import express from 'express';
import {SignUp,SignIn} from '../Controllers/authControllers.js'
const router = express.Router();

router.post('/Register',SignUp);
router.post('/login',SignIn);

export default router;
import express from 'express';
import {SignUp} from '../Controllers/authControllers.js'
const router = express.Router();

router.post('/Register',SignUp);


export default router;
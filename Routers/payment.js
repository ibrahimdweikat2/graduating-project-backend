import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();
const router=express.Router();
const stripe=new Stripe(`${process.env.STRIPE_SECRET_KEY}`)

router.post('/payment', async (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: 'usd'
    },(err,striperes)=>{
        if(err){
            res.status(500).json(err)
        }else{
            res.status(200).json(striperes)
        }
    }
    )
});

export default router;
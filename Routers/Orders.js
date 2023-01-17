import Order from '../models/Order.js';
import {verifyTokenAndAdmin,verifyTokenAndAuthorization} from '../Middleware/userMiddleWare.js';
import express from 'express';

const router=express.Router();

router.post("/addOrder",verifyTokenAndAdmin,async(req,res)=>{
    const newOrder= new Order({userId:req.user.id,...req.body});
    try{
            const SavedOrder=await newOrder.save();
            res.status(200).json(SavedOrder);
    }catch(err)
    {
        res.status(500).json(err)
    }
})

//Update Cart
router.put("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try
    {
        const updateOrder=await Order.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true});

        res.status(200).json(updateOrder);
    }catch(err){
        res.status(500).json(err);
    }
})

//Delete Cart

router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
   try{
    await Order.findByIdAndDelete(req.params.id);
    res.json('Order Deleted successfully!');
   }catch(err)
   {
    res.json(err);
   }
})

//get user Cart

router.get("/find/:userId",verifyTokenAndAdmin,async(req,res)=>{
    try{
     const order=await Order.find({userId:req?.params?.userId});
     res.json(order);
    }catch(err)
    {
     res.json(err);
    }
 })


 //get all 

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
     const orders=await Order.find();
     res.status(200).json(orders);
    }catch(err)
    {
     res.status(500).json(err);
    }
 });

 router.get('/status',async (req,res)=>{
    const date=new Date();
    const lastMonth=new Date(date.setMonth(date.getMonth() -1));
    const previousMonth=new Date(new Date().setMonth(lastMonth.getMonth()-2));
    try {
        const income=await Order.aggregate([
            {$match:{createdAt:{$gte:previousMonth}}},
            {$project:{
                month:{$month: "$createdAt"},
                sales:"$amount"
            }},
            {$group:{
                _id:"$month",
                total:{$sum:"$sales"}
            }}
        ]);
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
 })

export default router;
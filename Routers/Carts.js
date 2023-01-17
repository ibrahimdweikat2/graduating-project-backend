import Cart from '../models/Cart.js';
import {verifyTokenAndAdmin,verifyTokenAndAuthorization} from '../Middleware/userMiddleWare.js';
import express from 'express';

const router=express.Router();

router.post("/addCart",verifyTokenAndAuthorization,async(req,res)=>{
    const {bookId,quantity}=req.body;
    try{
        const exixtingCart=await Cart.findOne({userId:req?.user?.id});
        let newCart;
        let result;
        if(exixtingCart){
            result=await Cart.findByIdAndUpdate(exixtingCart?._id,{userId:req?.user?.id,Books:[...exixtingCart.Books,{bookId,quantity}]});
        }else{
            newCart= new Cart({userId:req?.user?.id,Books:[{bookId,quantity}]});
            result=await newCart.save();
        }
        res.status(200).json(result);
    }catch(err)
    {
        res.status(500).json(err)
    }
})

//Update Cart
router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try
    {
        const updateCart=await Cart.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true});

        res.status(200).json(updateCart);
    }catch(err){
        res.status(500).json(err);
    }
})

//Delete Cart

router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
   try{
    await Product.findByIdAndDelete(req.params.id);
    res.json('Cart Deleted successfully!');
   }catch(err)
   {
    res.json(err);
   }
})

//get user Cart

router.get("/find/:userId",verifyTokenAndAuthorization,async(req,res)=>{
    try{
     const cart=await Cart.findOne({userId:req?.params?.userId}).populate('Books.bookId');
     res.json(cart);
    }catch(err)
    {
     res.json(err);
    }
 })


 //get all 

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
     const cart=await Cart.find();
     res.status(200).json(cart);
    }catch(err)
    {
     res.status(500).json(err);
    }
 })

export default router;
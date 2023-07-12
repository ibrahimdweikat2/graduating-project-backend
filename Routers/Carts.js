import Cart from '../models/Cart.js';
import {verifyTokenAndAdmin,verifyTokenAndAuthorization,verifyToken} from '../Middleware/userMiddleWare.js';
import express from 'express';

const router=express.Router();

router.post("/addCart",verifyToken,async(req,res)=>{
    const {bookId,quantity}=req.body;
    try{
        const exixtingCart=await Cart.findOne({userId:req?.user?.id});
        let newCart;
        let result;
        if(exixtingCart){
                result=await Cart.findByIdAndUpdate(exixtingCart?._id,{userId:req?.user?.id,Books:[...exixtingCart?.Books,{bookId,quantity}]},{new:true});
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

router.delete("/delete/:id",verifyTokenAndAuthorization,async(req,res)=>{
   try{
    const cart=await Cart.findOne({userId:req.params.id});
    await Cart.findByIdAndDelete(cart?._id);
    res.json('Cart Deleted successfully!');
   }catch(err)
   {
    res.json(err);
   }
})


//get user Cart

router.get("/find/:userId",verifyToken,async(req,res)=>{
    try{
        let cart;
    if(req?.user?.id === req?.params?.userId || req?.user?.isAdmin){
        cart=await Cart.findOne({userId:req?.params?.userId}).populate('Books.bookId');
    }
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

router.put("/updatequantity/:id",verifyTokenAndAuthorization,async (req,res)=>{
    try {
        const cart=await Cart.findOne({userId:req?.params?.id});
        if(!cart)return res.status(404).json({message:"Cart Not Found"});
        Cart.findByIdAndUpdate({userId:req?.params?.id},{
            $set:{...cart,quantity:quantity+1}
        },{new:true});
        return res.status(200).json({message:"Updated"});
    } catch (error) {
        return res.status(500).json({error: error});
    }
})
export default router;
import Product from '../models/Books.js';
import express from 'express';
import {verifyTokenAndAdmin,verifyTokenAndAuthorization} from '../Middleware/userMiddleWare.js';

const router=express.Router();

router.post("/addBook",verifyTokenAndAdmin,async(req,res)=>{
    const newProduct= new Product(req.body);
    try{
            const SavedBook=await newProduct.save();
            res.status(200).json(SavedBook);
    }catch(err)
    {
        res.status(500).json(err)
    }
})

//Update Book
router.put("/update/:id",verifyTokenAndAdmin,async(req,res)=>{
    try
    {
        const updateBook=await Product.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true});

        res.json(updateBook);
    }catch(err){
        res.json(err);
    }
})

//Delete Book

router.delete("/delete/:id",verifyTokenAndAdmin,async(req,res)=>{
   try{
    await Product.findByIdAndDelete(req.params.id);
    res.json('Book Deleted successfully!');
   }catch(err)
   {
    res.json(err);
   }
})

//Get Book

router.get("/find/:id",async(req,res)=>{
    try{
     const book=await Product.findById(req.params.id);
     res.status(200).json(book);
    }catch(err)
    {
     res.status(500).json({message:err.message});
    }
 })


 //get all Books

 router.get("/",async(req,res)=>{
    const query=req.query.new;
    const queryCat=req.query.category;
    try{
        let book;

        if(query)
        {
            book=await Product.find().sort({createdAt:-1});
        }
        else if(queryCat)
        {
            book=await Product.find({category:{
                $in:[queryCat],
            }})
        }else
        {
            book=await Product.find()
        }

        res.status(200).json(book);

    
    }catch(err)
    {
     res.status(500).json(err);
    }
 })



export default router;
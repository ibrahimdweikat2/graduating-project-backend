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
    const {page}=req.query;
    try{
        const Limit=12;
        const startIndex=(Number(page)-1)*Limit;
        const total=await Product.countDocuments({});
        const books=await Product.find().skip(startIndex).limit(Limit);
        res.status(200).json({books,numberOfPages:Math.ceil(total/Limit)});
    }catch(err)
    {
     res.status(500).json(err);
    }
 })

 router.get('/search',async(req,res)=>{
    const query=req.query.query;
    try {
        const books=await Product.find({$or:[{title:{$regex:query,$options:'i'}},{author:{$regex:query,$options:'i'}}]});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
 }
)

router.get('/bestsellers',async(req,res)=>{
    try {
        const books=await Product.find({review_count:{$gte:10000}}).limit(6);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
)

router.get('/toprate',async(req,res)=>{
    try {
        const books=await Product.find({rating:{$gte:4.3}}).limit(6);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
)



export default router;
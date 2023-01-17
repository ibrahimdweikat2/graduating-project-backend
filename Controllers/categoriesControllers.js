import categoriesSchema from '../models/Categories.js';


export const getCategoriesByName=async(req,res)=>{
    try {
        const categories=await categoriesSchema.find({title:req?.params?.title});
        if(!categories) return res.status(404).json({message:"Category not found"});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const createCategories=async(req,res)=>{
    try {
        await categoriesSchema.create({title:req?.body?.title});
        res.status(201).json({message:"Category created"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const deleteCategories=async(req,res)=>{
    try {
        const category = await categoriesSchema.findById(req?.params?.id);
        if(!category) return res.status(404).json({message:"Category not found"});
        await categoriesSchema.findByIdAndDelete(req?.params?.id);
        res.status(200).json({message:"Category deleted"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const updateCategories=async(req,res)=>{
    try {
        const category = await categoriesSchema.findById(req?.params?.id);
        if(!category) return res.status(404).json({message:"Category not found"});
        await categoriesSchema.findByIdAndUpdate(req?.params?.id,req?.body,{new:true});
        res.status(200).json({message:"Category updated"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
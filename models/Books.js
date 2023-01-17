import mongoose from "mongoose";

const bookSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    format:String,
    num_pages:Number,
    rating:Number,
    rating_count:Number,
    review_count:Number,
    inStock:{type:Boolean, default:true},
},{timestamps:true});

export default mongoose.model('books',bookSchema);
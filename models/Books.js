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
    categories:Array,
    format:String,
    num_pages:Number,
    rating:Number,
    rating_count:Number,
    review_count:Number,
    price:{type:Number,default:0},
    inStock:{type:Boolean, default:true},
},{timestamps:true});

export default mongoose.model('books',bookSchema);
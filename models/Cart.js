import mongoose from "mongoose";

const cartSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    Books:[
        {
            bookId:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"Books"
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ]

},{timestamps:true});

export default mongoose.model("Cart",cartSchema);
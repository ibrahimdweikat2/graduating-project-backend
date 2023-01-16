import mongoose from "mongoose";

const orderSchema=mongoose.Schema({
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
    ],
    Address:{type:Object,required:true},
    status:{
        type:String,
        default:"Pending"
    },
    amount:{
        type:Number,required:true
    }

},{timestamps:true});

export default mongoose.model("Order",orderSchema);
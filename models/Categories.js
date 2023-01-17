import mongoose from "mongoose";

const categorieSchema=mongoose.Schema({
    title:{type:String, required:true,unique:true},
    Books:[
        {
            bookId:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:"Books"
            }
        }
    ]
},{timestamps:true});


export default mongoose.model("categorie",categorieSchema);
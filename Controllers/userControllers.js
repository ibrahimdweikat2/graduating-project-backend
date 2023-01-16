import userSchema from '../models/User.js';

export const getUser = async (req, res) => {
    try {
        const user =await userSchema.findById(req?.params?.id);
        if(!user) return res.status(404).json("User not found");
        const {password,...other}=user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUsers = async (req, res) => {
    try {
        const users=await userSchema.find();
        if(!users) return res.status(404).json("No users found");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user =await userSchema.findById(req?.params?.id);
        if(!user) return res.status(404).json("User not found");
        await userSchema.findByIdAndDelete(req?.params?.id);
        res.status(200).json("User deleted");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateUser = async (req, res) => {
    try {
        const user =await userSchema.findById(req?.params?.id);
        if(!user) return res.status(404).json("User not found");
        const updateuser =await userSchema.findByIdAndUpdate(req?.params?.id, req?.body,{new:true});
        const {password,...other}=updateuser?._doc;
        res.status(200).json({message: "User updated",...other});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getStatus=async (req, res) => {
    const date=new Date();
    const lastYear=new Date(date.setFullYear(date.getFullYear() -1));
    try {
        const status=await userSchema.aggregate([
            {$match:{createdAt:{$gte:lastYear}}},
            {$project:{
                month:{$month: "$createdAt"},
            }},
            {$group:{
                _id:"$month",
                total:{$sum :1}
            }}
        ]);
        res.status(200).json(status);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {
    const authToken=req.headers.authorization;
    if(authToken && authToken.length <500){
        const token=authToken.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC,(err,user)=>{
            if(err){
                return res.status(401).json("Token Is Not Valid");
            }
            req.user=user;
            next();
        })
    } 
}

export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req,res,()=>{
        if(req?.user?.id === req?.params?.id || req?.user?.isAdmin){
            next();
        }else{
            return res.status(401).json({message:'You Are Not Allow To Do That!'});
        }
    })
}

export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req,res,()=>{
        if(req?.user?.isAdmin){
            next();
        }else{
            return res.status(401).json({message:'You Are Not Allow To Do That!'});
        }
    })
}
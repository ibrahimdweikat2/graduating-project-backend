import bodyParser from "body-parser";
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRouter from './Routers/Auth.js';
import userRouter from './Routers/Users.js';
import categoriesRouter from './Routers/Categories.js';
import booksRouter from './Routers/Books.js';
import cartRouter from './Routers/Carts.js';
import ordersRouter from './Routers/Orders.js';
const app =express();
dotenv.config();

app.use(bodyParser.json({limit:'40mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'40mb',extended:true}));
app.use(cors());

app.use('/api/auth',authRouter);
app.use('/api/users',userRouter);
app.use('/api/categories',categoriesRouter);
app.use('/api/books',booksRouter);
app.use('/api/carts',cartRouter);
app.use('/api/orders',ordersRouter);


app.get('/',(req,res)=>{
    res.send('App Is Running');
});


mongoose.set('strictQuery', true);
app.listen(process.env.PORT || 5000);


mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true,useUnifiedTopology:true})
.then(()=>console.log(`Server is listening on port ${process.env.PORT || 5000}`))
.catch(err => console.error(err));
import bodyParser from "body-parser";
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRouter from './Routers/Auth.js';

const app =express();
dotenv.config();

app.use(bodyParser.json({limit:'40mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'40mb',extended:true}));
app.use(cors());

app.use('/api/auth',authRouter);

app.get('/',(req,res)=>{
    res.send('App Is Running');
});


mongoose.set('strictQuery', true);
app.listen(process.env.PORT || 5000);


mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true,useUnifiedTopology:true})
.then(()=>console.log(`Server is listening on port ${process.env.PORT || 5000}`))
.catch(err => console.error(err));
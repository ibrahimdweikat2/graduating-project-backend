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


const PORT=process.env.PORT || 5000;
const CONNECTION_URL=process.env.CONNECTION_URL;
mongoose.set('strictQuery', true);

mongoose.connect(CONNECTION_URL,{useUnifiedTopology:true,useNewUrlParser:true})
.then(PORT,app.listen(PORT=>console.log(`Server Run At Port : ${PORT}`)))
.catch(error=>console.log(error.message));
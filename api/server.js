import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRoute from './routes/userRoute.js';
import gigRoute from './routes/gigRoute.js';
import orderRoute from './routes/orderRoute.js';
import conversationRoute from './routes/conversationRoute.js';
import messageRoute from './routes/messageRoute.js';
import reviewRoute from './routes/reviewRoute.js';
import authRoute from './routes/authRoute.js';



const app = express();
dotenv.config();

//middleware
app.use(cors({origin:'http://localhost:5173',credentials:true}))
app.use(express.json());
app.use(cookieParser());


//routes
app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/gigs',gigRoute);
app.use('/api/orders', orderRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages',messageRoute);
app.use('/api/reviews', reviewRoute);


//error handler
app.use((err,req,res,next)=> {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong'

    return res.status(errorStatus).send(errorMessage);
})


//db connection

mongoose.set('strictQuery',true)

const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connected to mongodb');
    } catch (error) {
        console.log(error)
        
    }
}




app.listen(5000,()=>{
    connect();
    console.log('server started at port 5000');
})

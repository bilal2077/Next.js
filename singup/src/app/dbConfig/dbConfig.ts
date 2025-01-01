import mongoose from "mongoose";
import { log } from "node:console";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log('Mongo db connected');
        })
       
        connection.on('error', (error) => {
            console.log('MongoDB connection error  please make sure Db is up and running  :  ' + error);
            process.exit();
        }) 
            

    } catch (error) {
        console.log('soothing went wrong in connecting to db');
        console.log(error);
        
        
    }}

    
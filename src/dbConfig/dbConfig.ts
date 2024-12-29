import mongoose from 'mongoose';

export async function connect() {
 try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        
        connection.on('connected', () => {
            console.log('MongoDB connected');
            
        });

        connection.on('error', (error) => {
            console.log('MongoDB connection Error, Please make Sure DB is up and run and running', error);
        });
 } catch (error) {
        console.log('something went wrong in connection to  DB'+ error);   
        process.exit();
 }
}       
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();
const PORT = 3000;

import userRouts from './routs/userRouts.js';
import chatRouts from './routs/chatRouts.js';


app.use(express.json());
// Allow front-end dev server (Vite default ports 5173/5174) and others
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:5174',
        'http://127.0.0.1:5174',
        'http://localhost:3000'
    ],
    credentials: true
}));
app.use('/api/users', userRouts);
app.use('/api/chats', chatRouts);


mongoose.connect("mongodb://localhost:27017/Zedny_db").then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
    console.log('Connected to MongoDB');
}).catch(err => console.log(err));

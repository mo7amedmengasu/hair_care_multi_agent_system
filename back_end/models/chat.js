import mongoose from "mongoose";



const Chats = new mongoose.Schema({
    User_id: Number,
    SessionId: String,
    chat: [
        {
            userMessage: String,
            aiMessage: String
        }
    ]
});



const ChatsData = mongoose.model('Chats', Chats);
export default ChatsData;
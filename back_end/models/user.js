import mongoose from "mongoose";



const User = new mongoose.Schema({
    id: Number,
    email: String,
    password: String
});

const UserData = mongoose.model('User', User);
export default UserData;
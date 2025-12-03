import UserData from "../models/user.js";

async function getUserByEmailPassword(email, password) {
    const normalizedEmail = (email || "").trim().toLowerCase();
    const user = await UserData.findOne({ email: normalizedEmail, password: password });
    return user;
}

async function createUser(id, email, password) {
    //get the last id and increment by 1
    let lastUser = await UserData.findOne().sort({ id: -1 });
    let nextId = lastUser ? lastUser.id + 1 : 1;
    const normalizedEmail = (email || "").trim().toLowerCase();
    const newUser = new UserData({ id: nextId, email: normalizedEmail, password: password });
    return newUser.save();
}


export { getUserByEmailPassword, createUser };
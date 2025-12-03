import ChatsData from "../models/chat.js";

export async function createNewSession(userId) {
    try {
        const lastSession = await ChatsData.findOne({ User_id: userId })
            .sort({ SessionId: -1 });

        const nextSession = lastSession ? parseInt(lastSession.SessionId) + 1 : 1;

        return await ChatsData.create({
            User_id: userId,
            SessionId: nextSession,
            chat: []
        });

    } catch (err) {
        throw err;
    }
}

export async function saveChatMessage(userId, userMessage, aiResponse) {
    try {
        let lastSession = await ChatsData.findOne({ User_id: userId })
            .sort({ SessionId: -1 });

        if (!lastSession) {
            lastSession = await createNewSession(userId);
        }

        lastSession.chat.push({ userMessage, aiMessage: aiResponse });
        return await lastSession.save();

    } catch (err) {
        throw err;
    }
}

export async function getChatsByUserId(userId) {
    try {
        return await ChatsData.find({ User_id: userId });
    } catch (err) {
        throw err;
    }
}

export async function getChatsBySessionId(userId, sessionId) {
    try {
        return await ChatsData.findOne({ User_id: userId, SessionId: sessionId });
    } catch (err) {
        throw err;
    }
}

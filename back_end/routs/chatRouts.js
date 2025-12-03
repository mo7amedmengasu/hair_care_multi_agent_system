import express from 'express';
import {
    saveChatMessage,
    getChatsByUserId,
    getChatsBySessionId,
    createNewSession
} from '../controllers/chatController.js';

const router = express.Router();

router.post('/save', async (req, res) => {
    const { userId, userMessage, aiResponse } = req.body;

    if (!userId || !userMessage || !aiResponse) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    try {
        const savedChat = await saveChatMessage(userId, userMessage, aiResponse);
        res.status(201).json(savedChat);
    } catch {
        res.status(500).json({ error: 'Failed to save chat message' });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const chats = await getChatsByUserId(req.params.userId);
        res.status(200).json(chats);
    } catch {
        res.status(500).json({ error: 'Failed to retrieve chats' });
    }
});

router.get('/user/:userId/session/:sessionId', async (req, res) => {
    try {
        const session = await getChatsBySessionId(req.params.userId, req.params.sessionId);
        res.status(200).json(session);
    } catch {
        res.status(500).json({ error: 'Failed to retrieve session' });
    }
});

router.post('/logout/:userId', async (req, res) => {
    try {
        const newSession = await createNewSession(req.params.userId);
        res.status(201).json(newSession);
    } catch {
        res.status(500).json({ error: 'Failed to create new session' });
    }
});

export default router;

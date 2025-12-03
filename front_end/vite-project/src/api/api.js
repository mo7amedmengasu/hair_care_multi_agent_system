import axios from 'axios';

// Back-end (users & chats) service on port 3000
const API = axios.create({ baseURL: 'http://localhost:3000/api' });

// AI service on port 8000
const AI_API = axios.create({ baseURL: 'http://localhost:8000' });

// User APIs
export const loginUser = (email, password) => API.post('/users/login', { email, password });
export const registerUser = (email, password) => API.post('/users/register', { email, password });

// Chat APIs
export const saveChat = (userId, userMessage, aiResponse) =>
    API.post('/chats/save', { userId, userMessage, aiResponse });
export const getUserChats = (userId) => API.get(`/chats/user/${userId}`);
export const getSessionChats = (userId, sessionId) => API.get(`/chats/user/${userId}/session/${sessionId}`);
export const createNewSession = (userId) => API.post(`/chats/logout/${userId}`);

// AI final answer endpoint
export const getFinalAnswer = (task, image_path, history) => {
    const payload = {
        task: task || '',
        image_path: image_path || '',
        history: Array.isArray(history) ? history : [],
    };
    return AI_API.post('/get-final-answer', payload, {
        headers: { 'Content-Type': 'application/json' },
    });
};

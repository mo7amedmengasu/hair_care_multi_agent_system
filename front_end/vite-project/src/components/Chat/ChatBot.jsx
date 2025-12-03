import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserChats, getSessionChats, saveChat, createNewSession, getFinalAnswer } from '../../api/api';
import Sidebar from './Sidebar';
import ChatInput from './ChatInput';
import '../../styles/chatbot.css';

export default function ChatBot() {
    const user = useMemo(() => JSON.parse(localStorage.getItem('user') || '{}'), []);
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]); // list of {User_id, SessionId, chat:[...]}
    const [currentSessionId, setCurrentSessionId] = useState(null);
    const [messages, setMessages] = useState([]); // chat array of current session
    const [imagePath, setImagePath] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user?.id) return;
        const fetchSessions = async () => {
            try {
                const { data } = await getUserChats(user.id);
                setSessions(data || []);
                const latest = (data || []).sort((a, b) => Number(b.SessionId) - Number(a.SessionId))[0];
                if (latest) {
                    setCurrentSessionId(latest.SessionId);
                    setMessages(latest.chat || []);
                }
            } catch (e) {
                console.error('Failed to load sessions', e);
            }
        };
        fetchSessions();
    }, [user]);

    const selectSession = async (sessionId) => {
        try {
            setCurrentSessionId(sessionId);
            const { data } = await getSessionChats(user.id, sessionId);
            setMessages(data?.chat || []);
        } catch (e) {
            console.error('Failed to load session', e);
        }
    };

    const handleCreateNewSession = async () => {
        try {
            const { data } = await createNewSession(user.id);
            // refresh sessions
            const list = await getUserChats(user.id);
            const all = list.data || [];
            setSessions(all);
            setCurrentSessionId(data.SessionId);
            setMessages([]);
        } catch (e) {
            console.error('Failed to create new session', e);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleUploadImage = async (file) => {
        if (!file) { setImagePath(null); return; }
        // For demo: assume user provides path; real app would upload and get server path
        setImagePath(file.name);
    };

    const handleSendMessage = async (userMessage) => {
        setLoading(true);
        try {
            // Build history in expected format from current messages
            const history = (messages || []).map(m => ({ userMessage: m.userMessage, aiMessage: m.aiMessage }));
            const ai = await getFinalAnswer(userMessage, imagePath ? `images/${imagePath}` : undefined, history);
            const aiHtml = ai.data?.final_answer || ai.data || '<div><p>No response</p></div>';

            // Save to chats service
            const saved = await saveChat(user.id, userMessage, aiHtml);
            const updatedSession = saved.data;
            setMessages(updatedSession.chat || []);

            // Ensure sessions reflect latest
            const { data } = await getUserChats(user.id);
            setSessions(data || []);
        } catch (e) {
            console.error('Failed to send message', e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-layout">
            <Sidebar
                sessions={sessions}
                currentSessionId={currentSessionId}
                onSelectSession={selectSession}
                onNewSession={handleCreateNewSession}
                onLogout={handleLogout}
            />
            <main className="chat-main">
                <div className="chat-stream">
                    {messages.length === 0 && (
                        <div className="welcome">
                            <h2>Ask me anything</h2>
                            <p>Your assistant responds with rich HTML.</p>
                        </div>
                    )}
                    {messages.map((msg, idx) => (
                        <div key={idx} className="chat-pair">
                            <div className="chat-msg user">{msg.userMessage}</div>
                            <div className="chat-msg ai" dangerouslySetInnerHTML={{ __html: msg.aiMessage }} />
                        </div>
                    ))}
                    {loading && <div className="loading">Thinking…</div>}
                </div>
                <ChatInput onSendMessage={handleSendMessage} onUploadImage={handleUploadImage} />
            </main>
        </div>
    );
}

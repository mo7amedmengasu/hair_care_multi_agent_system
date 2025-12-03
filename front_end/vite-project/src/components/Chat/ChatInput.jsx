import React, { useState } from 'react';
import '../../styles/chatinput.css';

export default function ChatInput({ onSendMessage, onUploadImage }) {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <div className="chat-input">
            <textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <input type="file" accept="image/*" onChange={(e) => onUploadImage(e.target.files?.[0] || null)} />
            <button onClick={handleSend}>Send</button>
        </div>
    );
}

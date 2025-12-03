import React from 'react';
import '../../styles/sidebar.css';

export default function Sidebar({ sessions, currentSessionId, onSelectSession, onNewSession, onLogout }) {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>Sessions</h2>
                <div className="sidebar-actions">
                    <button className="new-session" onClick={onNewSession}>New Session</button>
                    <button className="logout" onClick={onLogout}>Logout</button>
                </div>
            </div>
            <ul className="session-list">
                {sessions.length === 0 && <li className="empty">No sessions yet</li>}
                {sessions.map((s) => (
                    <li
                        key={s.SessionId}
                        className={s.SessionId === currentSessionId ? 'active' : ''}
                        onClick={() => onSelectSession(s.SessionId)}
                    >
                        Session {s.SessionId}
                    </li>
                ))}
            </ul>
        </aside>
    );
}

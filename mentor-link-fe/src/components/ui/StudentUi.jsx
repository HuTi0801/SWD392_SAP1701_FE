import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SidebarButton = ({ icon, label, onClick }) => (
    <button
        className="w-full text-left flex items-center space-x-2 p-2 rounded bg-[#FF9E6D] hover:bg-[#FF7043]"
        onClick={onClick}
    >
        <span>{icon}</span>
        <span>{label}</span>
    </button>
);

export const InfoCard = ({ title, icon, children }) => (
    <div className="p-4 border border-[#FF9E6D] bg-white rounded-lg">
        <h3 className="text-lg font-bold flex items-center space-x-2">
            <span>{icon}</span>
            <span>{title}</span>
        </h3>
        <div className="mt-2 space-y-2">{children}</div>
    </div>
);

export const DeadlineItem = ({ title, date }) => (
    <div className="flex justify-between bg-orange-100 p-2 rounded">
        <span className="font-bold">{title}</span>
        <span>{date}</span>
    </div>
);

export const Notification = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="p-3 bg-white shadow rounded">
            <button onClick={() => setIsOpen(!isOpen)} className="font-bold text-gray-700">
                🔔
            </button>
            {isOpen && (
                <div>
                    <p className="text-gray-600 text-sm">Body text.</p>
                    <button className="mt-1 px-3 py-1 bg-gray-200 text-gray-700 rounded">Confirmed</button>
                </div>
            )}
        </div>
    );
};

export const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="w-full bg-[#FF9E6D] text-white flex items-center justify-between px-6 py-3">
            <div className="flex items-center space-x-3">
                <img src="https://placehold.co/40" alt="Logo" className="w-10 h-10 rounded-full" />
                <span className="font-bold text-lg">FPT MentorLink</span>
            </div>
            <nav className="space-x-6">
                <a href="#" className="font-bold hover:underline">Homepage</a>
                <a href="#" className="font-bold hover:underline">Contact</a>
            </nav>
            <div className="flex items-center space-x-4">
                <button>🔍</button>
                <button>💳</button>
                <button onClick={() => navigate('/student-info')}>👤</button>
            </div>
        </header>
    );
};

export const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <div className="w-1/6 bg-white p-4 text-white space-y-4">
            <SidebarButton icon="🏠" label="Home" onClick={() => navigate('/')} />
            <SidebarButton icon="📋" label="Project" onClick={() => navigate('/project-management')} />
            <SidebarButton icon="👥" label="Mentors" onClick={() => navigate('/book-mentor')} />
            <SidebarButton icon="📅" label="Appointment" onClick={() => navigate('/appointment-management')} />
            <SidebarButton icon="⏰" label="Deadline" onClick={() => navigate('/deadline-student')} />
            <SidebarButton icon="💳" label="Wallet" onClick={() => navigate('/wallet-student')} />
            <SidebarButton icon="💬" label="Chat" />
        </div>
    );
};

export const NotificationPanel = () => (
    <div className="w-1/6 p-4 space-y-2 bg-orange-100">
        <Notification />
        <Notification />
        <Notification />
        <Notification />
    </div>
);

export const Footer = () => (
    <footer className="w-full bg-[#FF9E6D] text-white text-center py-2">
        © Copyright 2025, All Rights Reserved by FPT MentorLink
    </footer>
);
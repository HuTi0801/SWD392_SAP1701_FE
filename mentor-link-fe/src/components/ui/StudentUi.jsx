import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';

export const SidebarButton = ({ icon, label, onClick }) => (
    <button
        className="w-full text-left flex items-center space-x-2 p-2 rounded bg-[#FF9E6D] hover:bg-[#FF7043] cursor-pointer"
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
            <button onClick={() => setIsOpen(!isOpen)} className="font-bold text-gray-700 cursor-pointer">
                <NotificationsIcon />
            </button>
            {isOpen && (
                <div>
                    <p className="text-gray-600 text-sm">Body text.</p>
                    <button className="mt-1 px-3 py-1 bg-gray-200 text-gray-700 rounded cursor-pointer">Confirmed</button>
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
                <button className="cursor-pointer"><SearchIcon /></button>
                <button className="cursor-pointer"><AccountBalanceWalletIcon /></button>
                <button className="cursor-pointer" onClick={() => navigate('/student-info')}><PersonIcon /></button>
            </div>
        </header>
    );
};

export const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <div className="w-1/7 bg-white p-4 text-white space-y-8">
            <SidebarButton icon={<HomeIcon />} label="Home" onClick={() => navigate('/')} />
            <SidebarButton icon={<AssignmentIcon />} label="Project" onClick={() => navigate('/project-management')} />
            <SidebarButton icon={<GroupIcon />} label="Mentors" onClick={() => navigate('/mentor-list')} />
            <SidebarButton icon={<CalendarMonthIcon />} label="Appointment" onClick={() => navigate('/appointment-management')} />
            <SidebarButton icon={<AccessTimeIcon />} label="Deadline" onClick={() => navigate('/deadline-student')} />
            <SidebarButton icon={<AccountBalanceWalletIcon />} label="Wallet" onClick={() => navigate('/wallet-student')} />
            <SidebarButton icon={<ChatIcon />} label="Chat" />
        </div>
    );
};

export const NotificationPanel = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed right-0 top-0 h-full flex z-50" style={{ right: '0px' }}>
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="bg-orange-100 p-4 h-16 mt-20 rounded-l-lg shadow-lg cursor-pointer hover:bg-orange-200 fixed right-0"
                >
                    <NotificationsIcon sx={{ fontSize: 32 }} />
                </button>
            )}
            <div className={`bg-orange-100 w-80 h-full p-4 space-y-2 transition-transform duration-300 ease-in-out transform shadow-lg fixed right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg">Notifications</h2>
                    <button onClick={() => setIsOpen(false)} className="hover:bg-orange-200 p-1 rounded">
                        <NotificationsIcon />
                    </button>
                </div>
                <Notification />
                <Notification />
                <Notification />
                <Notification />
            </div>
        </div>
    );
};

export const Footer = () => (
    <footer className="w-full bg-[#FF9E6D] text-white text-center py-2">
        © Copyright 2025, All Rights Reserved by FPT MentorLink
    </footer>
);
import React, { useState, useEffect } from 'react';
import { Header, Sidebar, NotificationPanel, Footer, SidebarButton, Notification } from '../../components/ui/StudentUi.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { logout as logoutApi } from '../../api/accountApi';
import { useNavigate } from 'react-router-dom';

const StudentInfo = () => {
    const [phone, setPhone] = useState('0944949152');
    const [email, setEmail] = useState('quynhpnse172xxx@fpt.edu.vn');
    const { auth, logout } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        const userInfo = localStorage.getItem('auth');
        console.log('User Information from localStorage:', JSON.parse(userInfo));
    }, []);

    const handlePhoneUpdate = async () => {
        try {
            // TODO: Add API call to update phone
            alert(`Phone number updated successfully to: ${phone}`);
        } catch (error) {
            console.error('Failed to update phone:', error);
            alert('Failed to update phone number');
        }
    };

    const handleEmailUpdate = async () => {
        try {
            // TODO: Add API call to update email
            alert(`Email updated successfully to: ${email}`);
        } catch (error) {
            console.error('Failed to update email:', error);
            alert('Failed to update email');
        }
    };

    const handleLogout = async () => {
        try {
            await logoutApi(auth.result.token);
            logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="min-h-screen bg-orange-50">
            <Header />

            <div className="flex h-[calc(100vh-60px)]">
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-6 bg-orange-50">
                    <h1 className="text-4xl font-bold text-center mb-6">Student Information</h1>

                    <div className="flex items-center space-x-12">
                        {/* Profile Image */}
                        <div className="flex flex-col items-center space-y-2">
                            <img
                                src="https://placehold.co/200"
                                alt="Profile"
                                className="w-48 h-48 rounded-full object-cover"
                            />
                            <span className="text-gray-600">Add an image</span>
                        </div>

                        {/* Info Form */}
                        <div className="flex-1 grid grid-cols-2 gap-6">
                            <InfoField label="Full name" value="Pham Nhu Quynh" />
                            <InfoField label="Major" value="Software Engineering" />
                            <InfoField label="Student Code" value="SE172562" />
                            <InfoField label="Project name" value="sapgeneral.vn" />
                            <EditableField label="Phone" value={phone} setValue={setPhone} onUpdate={handlePhoneUpdate} />
                            <InfoField label="Team's name" value="Learner behavior management" />
                            <EditableField label="Gmail" value={email} setValue={setEmail} onUpdate={handleEmailUpdate} />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex space-x-4 justify-center">
                        <button className="px-6 py-2 bg-green-500 text-white rounded">Save</button>
                        <button className="px-6 py-2 bg-green-500 text-white rounded">Apply the Mentor position</button>
                        <button 
                            onClick={handleLogout}
                            className="px-6 py-2 bg-red-500 text-white rounded"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <NotificationPanel />
            </div>

            <Footer />
        </div>
    );
};

// Reusable Components

const InfoField = ({ label, value }) => (
    <div className="flex flex-col">
        <label className="font-bold mb-1">{label}</label>
        <input type="text" value={value} readOnly className="p-2 border rounded bg-gray-100" />
    </div>
);

const EditableField = ({ label, value, setValue, onUpdate }) => (
    <div className="flex flex-col">
        <label className="font-bold mb-1">{label}</label>
        <div className="flex space-x-2">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="p-2 border rounded flex-1"
            />
            <button onClick={onUpdate} className="px-4 bg-orange-400 text-white rounded">Update</button>
        </div>
    </div>
);

export default StudentInfo;
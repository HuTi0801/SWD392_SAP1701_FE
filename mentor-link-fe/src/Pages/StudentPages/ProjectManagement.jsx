import React from 'react';
import { Header, Sidebar, NotificationPanel, Footer, SidebarButton } from '../../components/ui/StudentUi.jsx';
import { useNavigate } from 'react-router-dom';

const ProjectManagement = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-orange-50">
            <Header />

            <div className="flex h-[calc(100vh-60px)]">
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <h1 className="text-3xl font-bold text-center mb-6">My Capstone Project</h1>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Left Column - Project Proposal Form */}
                        <div className="p-6 border border-orange-300 bg-white rounded-lg space-y-4">
                            <FormRow label="Topic">
                                <button className="w-full bg-orange-300 text-center py-2 rounded">Propose a Topic</button>
                            </FormRow>

                            <FormRow label="Major">
                                <select className="w-full bg-orange-300 p-2 rounded">
                                    <option>Choose a major</option>
                                </select>
                            </FormRow>

                            <FormRow label="Description">
                                <textarea className="w-full bg-orange-300 p-2 rounded" placeholder="A short description"></textarea>
                            </FormRow>

                            <FormRow label="Lecturer">
                                <select className="w-full bg-orange-300 p-2 rounded">
                                    <option>Choose a lecturer</option>
                                </select>
                            </FormRow>

                            <div className="flex space-x-4">
                                <button className="px-4 py-2 bg-white border rounded">Clear</button>
                                <button className="px-4 py-2 bg-gray-500 text-white rounded">Save</button>
                            </div>
                        </div>

                        {/* Right Column - Proposal Status */}
                        <div className="p-6 border border-orange-300 bg-white rounded-lg space-y-4">
                            <StatusRow label="Proposal Status">
                                <span className="bg-green-300 px-4 py-1 rounded">Approved</span>
                            </StatusRow>

                            <StatusRow label="Assigned Lecturer">
                                <span className="font-bold">Mr. Hoang Nguyen The</span>
                            </StatusRow>

                            <StatusRow label="Comment">
                                <span className="bg-green-300 px-4 py-1 rounded">Your project has already been approved</span>
                            </StatusRow>

                            <div className="mt-4">
                                <h3 className="font-bold">Project Progress</h3>
                                <div className="flex items-center space-x-2">
                                    <span className="text-orange-500 font-bold">20%</span>
                                    <div className="w-full bg-orange-200 h-2 rounded">
                                        <div className="bg-orange-500 h-2 rounded" style={{ width: '20%' }}></div>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-2 bg-green-300 rounded font-bold" onClick={() => navigate("/project-details")}>Project Details</button>
                        </div>
                    </div>
                </div>

                <NotificationPanel />
            </div>

            <Footer />
        </div>
    );
};

const FormRow = ({ label, children }) => (
    <div>
        <label className="font-bold block mb-1">{label}</label>
        {children}
    </div>
);

const StatusRow = ({ label, children }) => (
    <div className="flex justify-between items-center">
        <span className="font-bold">{label}</span>
        {children}
    </div>
);

export default ProjectManagement;
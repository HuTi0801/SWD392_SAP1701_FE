import React from 'react';
import { Header, Sidebar, NotificationPanel, Footer, SidebarButton, Notification } from '../../components/ui/StudentUi.jsx';

const ProjectDetails = () => {
    return (
        <div className="min-h-screen bg-orange-50">
            <Header />

            <div className="flex h-[calc(100vh-60px)]">
                <Sidebar />

                <div className="flex-1 p-6 overflow-y-auto">
                    <h1 className="text-3xl font-bold text-center mb-6">Project Details Information</h1>

                    {/* Member Information */}
                    <div className="bg-white border border-orange-300 rounded-lg p-4 space-y-4">
                        <h2 className="font-bold text-lg">Member Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <InfoRow label="Mentors" value="077xxxxxxx | Mr. Quoc Vo Dang Kien" />
                            <InfoRow label="Leader Team" value="SE172562 | Bui Huu Tien" buttonLabel="Remove" />
                            <MemberRow member="Member 2" />
                            <MemberRow member="Member 3" />
                            <MemberRow member="Member 4" />
                            <MemberRow member="Member 5" />
                        </div>
                    </div>

                    {/* Progress Tracker */}
                    <h2 className="font-bold text-lg mt-6 mb-2">Progress Tracker</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <Checkpoint 
                            title="CHECKPOINT 1" 
                            date="Feb 5, 2025" 
                            submission="Proposal Submission"
                            grade="9.5"
                            status="Approved"
                            document="checkpoint_1_team_1.pdf"
                            feedback="Good structure, proceed to CP2."
                        />
                        <Checkpoint 
                            title="CHECKPOINT 2" 
                            date="Mar 15, 2025" 
                            submission="Name of checkpoint"
                            grade="0.0"
                            status="Not started"
                            document="(File pdf, doc, docx, excel)"
                            feedback="Feedback of my lecture"
                        />
                        <Checkpoint 
                            title="CHECKPOINT 3" 
                            date="Due Date"
                            submission="Proposal Submission"
                            grade="0.0"
                            status="Not started"
                            document="(File pdf, doc, docx, excel)"
                            feedback="Feedback of my lecture"
                        />
                    </div>
                </div>

                <NotificationPanel />
            </div>

            <Footer />
        </div>
    );
};

// Reusable Components

const InfoRow = ({ label, value, buttonLabel }) => (
    <div className="flex justify-between items-center">
        <span className="font-bold">{label}</span>
        <div className="flex items-center space-x-2">
            <span className="text-sm">{value}</span>
            {buttonLabel && <button className="px-2 py-1 bg-gray-500 text-white rounded">{buttonLabel}</button>}
        </div>
    </div>
);

const MemberRow = ({ member }) => (
    <div className="flex items-center justify-between space-x-2">
        <span className="font-bold">{member}</span>
        <div className="flex space-x-2">
            <button className="px-3 py-1 bg-orange-300 rounded">Student Code</button>
            <span>Member Name</span>
            <button className="px-3 py-1 bg-green-300 rounded">Add</button>
        </div>
    </div>
);

const Checkpoint = ({ title, date, submission, grade, status, document, feedback }) => (
    <div className="border border-orange-300 bg-white rounded-lg p-4 space-y-2">
        <div className="flex justify-between font-bold">
            <span>{title}</span>
            <span>{date}</span>
        </div>
        <div className="flex justify-between items-center">
            <span className="bg-orange-300 px-3 py-1 rounded">{submission}</span>
            <span className="text-2xl font-bold text-orange-500">{grade}</span>
        </div>
        <div className="flex justify-between items-center">
            <span className="font-bold">Status</span>
            <span className={`px-3 py-1 rounded ${status === 'Approved' ? 'bg-green-300' : 'bg-gray-300'}`}>{status}</span>
        </div>
        <div className="flex justify-between items-center">
            <span className="font-bold">Document</span>
            <span className="text-sm">{document}</span>
        </div>
        <div>
            <span className="font-bold block">Feedback</span>
            <p className="italic">{feedback}</p>
        </div>
    </div>
);

export default ProjectDetails;
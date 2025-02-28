import React from 'react';
import { Header, Sidebar, NotificationPanel, Footer, SidebarButton, Notification } from '../../components/ui/StudentUi.jsx';

const DeadlineStudent = () => {
    return (
        <div className="min-h-screen bg-orange-50">
            <Header />

            <div className="flex h-[calc(100vh-60px)]">
                <Sidebar />

                <div className="flex-1 p-6 overflow-y-auto space-y-6">
                    {/* Deadline Section */}
                    <h1 className="text-3xl font-bold text-center">Deadline Section</h1>
                    <div className="grid grid-cols-3 gap-6">
                        <CheckpointCard
                            checkpoint="CHECKPOINT 1"
                            date="Feb 5, 2025"
                            reportType="Proposal Submission"
                            status="Submitted"
                            document="Checkpoint1.pdf"
                            guideline="Must include research scope."
                            overdueText="Overdue: 2 days after."
                        />
                        <CheckpointCard
                            checkpoint="CHECKPOINT 2"
                            date="Due Date"
                            reportType="Semi Mid-Term Report"
                            status="Pending"
                            document="Checkpoint2.pdf"
                            guideline="Must include research scope."
                            reminderText="Reminder: ... days left!"
                            hasCancelButton
                        />
                        <CheckpointCard
                            checkpoint="CHECKPOINT 3"
                            date="Due Date"
                            reportType="Mid-Term Report"
                            status="Upcoming"
                            document="[File doc, docx, excel, pdf]"
                            guideline="Must include research scope."
                            reminderText="Reminder: ... days left!"
                            hasSubmitButton
                        />
                    </div>

                    {/* Weekly Report */}
                    <h1 className="text-3xl font-bold text-center mt-6">Weekly Report</h1>
                    <div className="flex space-x-6">
                        <WeeklyReport />
                        <WeeklyReport />
                        <button className="px-4 py-2 bg-orange-400 text-white rounded shadow">
                            Add another report
                        </button>
                    </div>
                </div>

                <NotificationPanel />
            </div>

            <Footer />
        </div>
    );
};

const CheckpointCard = ({ checkpoint, date, reportType, status, document, guideline, overdueText, reminderText, hasCancelButton, hasSubmitButton }) => (
    <div className="border border-orange-300 bg-white rounded-lg p-4 space-y-2">
        <div className="flex justify-between font-bold">
            <span>{checkpoint}</span>
            <span className="text-orange-600">{date}</span>
        </div>
        <div className="flex justify-between">
            <span className="bg-orange-300 px-3 py-1 rounded">{reportType}</span>
            <div className="space-x-2">
                {hasCancelButton && <button className="px-3 py-1 bg-gray-500 text-white rounded">Cancel</button>}
                {hasSubmitButton && <button className="px-3 py-1 bg-black text-white rounded">Submit</button>}
            </div>
        </div>
        <div className="flex justify-between">
            <span className="font-bold">Status</span>
            <span className={`px-3 py-1 rounded ${status === 'Submitted' ? 'bg-green-300' : 'bg-gray-300'}`}>{status}</span>
        </div>
        <div className="flex justify-between">
            <span className="font-bold">Document</span>
            <span className="text-sm">{document}</span>
        </div>
        <div>
            <span className="font-bold">Guideline</span>
            <p className="italic">{guideline}</p>
        </div>
        {overdueText && (
            <p className="text-red-500 text-xs mt-1">{overdueText}</p>
        )}
        {reminderText && (
            <p className="text-orange-500 text-xs mt-1">{reminderText}</p>
        )}
    </div>
);

const WeeklyReport = () => (
    <div className="border border-orange-300 bg-white rounded-lg p-4 space-y-2 w-1/3">
        <div className="flex justify-between">
            <span className="font-bold">REPORT 1</span>
            <select className="border rounded px-2 py-1 text-sm">
                <option>WEEK 01</option>
                <option>WEEK 02</option>
            </select>
        </div>
        <div className="flex justify-between">
            <span className="bg-orange-300 px-3 py-1 rounded">Completed Task</span>
            <span className="bg-gray-300 px-3 py-1 rounded">Pending</span>
        </div>
        <div className="space-y-2">
            <Task name="Research on project topic" />
            <Task name="Draft project proposal" />
            <button className="w-full bg-gray-200 py-1 rounded">Add another reports</button>
            <button className="w-full bg-green-400 text-white py-1 rounded">Submit Report</button>
        </div>
    </div>
);

const Task = ({ name }) => (
    <div className="bg-orange-200 px-3 py-1 rounded">{name}</div>
);

export default DeadlineStudent;
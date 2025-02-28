import React from 'react';
import { Header, Sidebar, NotificationPanel, Footer, SidebarButton, Notification } from '../../components/ui/StudentUi.jsx';

const AppointmentManagement = () => {
    return (
        <div className="min-h-screen bg-orange-50">
            <Header />

            <div className="flex h-[calc(100vh-60px)]">
                <Sidebar />

                <div className="flex-1 p-6 overflow-y-auto">
                    <h1 className="text-4xl font-bold text-center">Appointments</h1>

                    {/* Appointment Cards Carousel */}
                    <div className="mt-6 flex justify-between space-x-6 overflow-x-auto">
                        <AppointmentCard type="UPCOMING" />
                        <AppointmentCard type="UPCOMING" />
                        <AppointmentCard type="PAST" />
                    </div>

                    {/* Details Appointment Section */}
                    <div className="mt-6 border rounded-lg p-4 bg-white">
                        <h2 className="text-2xl font-bold text-center">Details Appointment</h2>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="space-y-4">
                                <AppointmentDetail label="Type" value="UPCOMING" highlight />
                                <AppointmentDetail label="Mentor" value="Ms. Nguyen Tram Phuc Duyen" />
                                <AppointmentDetail label="Date" value="Feb 10, 2025 10:00 AM" />
                                <AppointmentDetail label="Topic" value="Research Proposal" />
                            </div>
                            <div className="space-y-4">
                                <AppointmentDetail label="Meeting Method" value="GOOGLE MEET" highlight />
                                <AppointmentDetail label="Meeting Link" value="https://meet.google.com/abc-xyza-bcl" link />
                                <AppointmentDetail label="Note" value="Prepare research outline before the session" />
                                <div className="flex space-x-4">
                                    <button className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                                    <button className="px-4 py-2 bg-orange-500 text-white rounded">Reschedule</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <NotificationPanel />
            </div>

            <Footer />
        </div>
    );
};

// Appointment Card Component
const AppointmentCard = ({ type }) => {
    const isPast = type === 'PAST';

    return (
        <div className="border rounded-lg p-4 bg-white min-w-[300px]">
            <h3 className="text-lg font-bold">{isPast ? 'PAST MEETING' : 'UPCOMING MEETING'}</h3>
            <div className="mt-2">
                {isPast ? (
                    <>
                        <div className="flex justify-between">
                            <button className="px-3 py-1 border rounded">Details</button>
                            <button className="px-3 py-1 border rounded">Submit</button>
                        </div>
                        <DetailItem label="Mentor" value="Mr. Quoc Vo Dang Kien" />
                        <DetailItem label="Date" value="Feb 10, 2025 10:00 AM" />
                        <DetailItem label="Topic" value="Research Proposal" />
                        <div className="mt-2">
                            <p className="text-sm">Fill your feedback!</p>
                            ⭐⭐⭐⭐⭐
                        </div>
                    </>
                ) : (
                    <>
                        <span className="px-2 py-1 bg-gray-200 rounded text-sm">Pending</span>
                        <DetailItem label="Mentor" value="Ms. Nguyen Tram Phuc Duyen" />
                        <DetailItem label="Date" value="Feb 10, 2025 10:00 AM" />
                        <DetailItem label="Topic" value="Research Proposal" />
                        <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded">Details</button>
                    </>
                )}
            </div>
        </div>
    );
};

const DetailItem = ({ label, value }) => (
    <div className="mt-2">
        <span className="block font-bold">{label}</span>
        <span>{value}</span>
    </div>
);

// Appointment Detail Row Component
const AppointmentDetail = ({ label, value, highlight, link }) => (
    <div>
        <label className="block font-bold">{label}</label>
        {link ? (
            <a href={value} className="text-blue-500 underline">{value}</a>
        ) : (
            <div className={`p-2 rounded ${highlight ? 'bg-orange-300' : 'border'}`}>{value}</div>
        )}
    </div>
);

export default AppointmentManagement;
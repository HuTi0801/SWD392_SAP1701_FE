import React, { useState } from 'react';
import { Header, Sidebar, NotificationPanel, Footer, SidebarButton, Notification } from '../../components/ui/StudentUi.jsx';

const BookMentor = () => {
    const [selectedDate, setSelectedDate] = useState('09.02.2025');
    const [selectedTime, setSelectedTime] = useState('07:00 - 09:15');
    const [meetingMethod, setMeetingMethod] = useState('GOOGLE MEET');

    return (
        <div className="min-h-screen bg-orange-50">
            <Header />

            <div className="flex h-[calc(100vh-60px)]">
                <Sidebar />

                <div className="flex-1 p-6 overflow-y-auto">
                    <h1 className="text-4xl font-bold text-center mb-6">Book an Appointment</h1>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Mentor Info */}
                        <div className="border rounded-lg bg-white p-4 flex flex-col items-center">
                            <h2 className="text-2xl font-bold">Mentor's Info</h2>
                            <img src="https://placehold.co/100" alt="Mentor" className="w-24 h-24 rounded-full mt-3" />
                            <p className="mt-3 font-bold">Nguyen Tram Phuc Duyen</p>
                        </div>

                        {/* Available Slots */}
                        <div className="border rounded-lg bg-white p-4">
                            <h2 className="text-2xl font-bold">Available Slots</h2>
                            <p className="mt-2 font-bold">Week 01</p>
                            <div className="mt-3 space-y-2">
                                <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="p-2 border rounded w-full bg-orange-200">
                                    <option>09.02.2025</option>
                                    {/* Add more dates if needed */}
                                </select>
                                <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="p-2 border rounded w-full bg-orange-200">
                                    <option>07:00 - 09:15</option>
                                    {/* Add more times if needed */}
                                </select>
                                <button className="px-4 py-2 bg-green-500 text-white rounded w-full">Select</button>
                            </div>
                        </div>
                    </div>

                    {/* Details Appointment Section */}
                    <div className="mt-6 border rounded-lg bg-white p-4">
                        <h2 className="text-2xl font-bold text-center">Details Appointment</h2>

                        <div className="grid grid-cols-2 gap-6 mt-4">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <DetailRow label="Type" value="PENDING" highlight />
                                <DetailRow label="Mentor" value="Ms. Nguyen Tram Phuc Duyen" />
                                <DetailRow label="Date" value={`${selectedDate} ${selectedTime}`} />
                                <DetailRow label="Topic" value="Research Proposal" />
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <label className="font-bold">Meeting Method</label>
                                    <select value={meetingMethod} onChange={(e) => setMeetingMethod(e.target.value)} className="p-2 border rounded bg-orange-200">
                                        <option>GOOGLE MEET</option>
                                        <option>ZOOM</option>
                                    </select>
                                </div>
                                <DetailRow label="Meeting Link" value="https://meet.google.com/abc-xyza-bcl" link />
                                <DetailRow label="Note" value="Prepare research outline before the session" />
                                <div className="flex justify-between">
                                    <button className="px-4 py-2 bg-gray-300 rounded">Clear</button>
                                    <button className="px-4 py-2 bg-orange-500 text-white rounded">Booking</button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 text-center">
                            <button className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
                        </div>
                    </div>
                </div>

                <NotificationPanel />
            </div>

            <Footer />
        </div>
    );
};

// Components

const DetailRow = ({ label, value, link, highlight }) => (
    <div className="flex items-center space-x-4">
        <label className="w-32 font-bold">{label}</label>
        {link ? (
            <a href={value} className="text-blue-500 underline">{value}</a>
        ) : (
            <div className={`flex-1 p-2 ${highlight ? 'bg-orange-300' : 'border rounded'}`}>{value}</div>
        )}
    </div>
);

export default BookMentor;
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Header, Sidebar, NotificationPanel, Footer, SidebarButton, Notification } from '../../components/ui/StudentUi.jsx';

const AppointmentManagement = () => {
    const [formValues, setFormValues] = useState({
        mentor: '',
        topic: '',
        note: '',
        date: new Date()
    });

    const handleInputChange = (field, value) => {
        setFormValues(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="min-h-screen bg-orange-50">
            <Header />

            <div className="flex h-[calc(100vh-60px)]">
                <Sidebar />

                <div className="flex-1 p-6 overflow-y-auto">
                    <h1 className="text-4xl font-bold text-center">Appointments</h1>

                    {/* Appointment Cards Carousel */}
                    <div className="mt-6 flex gap-4 overflow-x-auto">
                        <AppointmentCard type="UPCOMING" />
                        <AppointmentCard type="UPCOMING" />
                        <AppointmentCard type="PAST" />
                    </div>

                    {/* Details Appointment Section */}
                    <div className="mt-6 border rounded-lg p-4 bg-white">
                        <h2 className="text-2xl font-bold text-center">Appointment Details</h2>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="space-y-4">
                                <AppointmentDetail label="Type" value="UPCOMING" highlight />
                                <AppointmentDetail 
                                    label="Mentor" 
                                    value={formValues.mentor} 
                                    placeholder="Ms. Nguyen Tram Phuc Duyen"
                                    onChange={(value) => handleInputChange('mentor', value)}
                                    editable 
                                />
                                <AppointmentDetail 
                                    label="Date" 
                                    value={formValues.date}
                                    onChange={(value) => handleInputChange('date', value)}
                                    type="date"
                                    editable 
                                />
                                <AppointmentDetail 
                                    label="Topic" 
                                    value={formValues.topic}
                                    placeholder="Research Proposal"
                                    onChange={(value) => handleInputChange('topic', value)}
                                    editable 
                                />
                            </div>
                            <div className="space-y-4">
                                <AppointmentDetail label="Meeting Method" value="GOOGLE MEET" highlight />
                                <AppointmentDetail label="Meeting Link" value="https://meet.google.com/abc-xyza-bcl" link />
                                <AppointmentDetail 
                                    label="Note" 
                                    value={formValues.note}
                                    placeholder="Prepare research outline before the session"
                                    onChange={(value) => handleInputChange('note', value)}
                                    editable 
                                />
                                <div className="flex justify-between items-center h-16">
                                    <button className="px-6 py-3 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer text-lg">Cancel</button>
                                    <button className="px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 cursor-pointer text-lg">Reschedule</button>
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
        <div className="border rounded-lg p-4 bg-white w-1/3 flex flex-col">
            <h3 className="text-lg font-bold">{isPast ? 'PAST MEETING' : 'UPCOMING MEETING'}</h3>
            <div className="mt-2 flex-1 flex flex-col justify-between">
                {isPast ? (
                    <>
                        <div>
                            <div className="flex justify-between">
                                <button className="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer">Details</button>
                                <button className="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer">Submit</button>
                            </div>
                            <DetailItem label="Mentor" value="Mr. Quoc Vo Dang Kien" />
                            <DetailItem label="Date" value="Feb 10, 2025 10:00 AM" />
                            <DetailItem label="Topic" value="Research Proposal" />
                        </div>
                        <div className="mt-2">
                            <p className="text-sm">Fill your feedback!</p>
                            ⭐⭐⭐⭐⭐
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <span className="px-2 py-1 bg-gray-200 rounded text-sm">Pending</span>
                            <DetailItem label="Mentor" value="Ms. Nguyen Tram Phuc Duyen" />
                            <DetailItem label="Date" value="Feb 10, 2025 10:00 AM" />
                            <DetailItem label="Topic" value="Research Proposal" />
                        </div>
                        <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer">Details</button>
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
const AppointmentDetail = ({ label, value, highlight, link, editable, placeholder, onChange, type }) => (
    <div>
        <label className="block font-bold">{label}</label>
        {link ? (
            <a href={value} className="text-blue-500 underline">{value}</a>
        ) : editable && type === 'date' ? (
            <DatePicker
                selected={value}
                onChange={onChange}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full p-2 rounded border bg-gray-50 hover:bg-white focus:bg-white"
            />
        ) : editable ? (
            <input 
                type="text" 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full p-2 rounded border bg-gray-50 hover:bg-white focus:bg-white placeholder-gray-500"
            />
        ) : (
            <div className={`p-2 rounded ${highlight ? 'bg-orange-300' : 'border'}`}>
                {type === 'date' ? value.toLocaleString() : value}
            </div>
        )}
    </div>
);

export default AppointmentManagement;
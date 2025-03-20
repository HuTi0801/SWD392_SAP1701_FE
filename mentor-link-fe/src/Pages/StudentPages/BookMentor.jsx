import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Header, Sidebar, NotificationPanel, Footer, SidebarButton, Notification } from '../../components/ui/StudentUi.jsx';

const BookMentor = () => {
    const [selectedSlotDate, setSelectedSlotDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [meetingMethod, setMeetingMethod] = useState('GOOGLE MEET');
    const [note, setNote] = useState('');
    const [status, setStatus] = useState('');
    const [mentor, setMentor] = useState('');
    const [topic, setTopic] = useState('');

    const handleSlotDateChange = (date) => {
        setSelectedSlotDate(date);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

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
                            <div className="mt-3 space-y-5">
                                <div className="flex items-start">
                                    <div className="flex-grow mr-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                        <DatePicker
                                            selected={selectedSlotDate}
                                            onChange={handleSlotDateChange}
                                            className="p-2 border rounded w-full bg-orange-200"
                                            dateFormat="MMMM d, yyyy"
                                            minDate={new Date()}
                                            placeholderText="Select a date"
                                        />
                                    </div>
                                    <div >
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                        <DatePicker
                                            selected={selectedTime}
                                            onChange={handleTimeChange}
                                            className="p-2 border rounded w-full bg-orange-200"
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"
                                            placeholderText="Select time"
                                        />
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded w-full cursor-pointer"
                                        onClick={() => {
                                            setSelectedDate(selectedSlotDate);
                                            setSelectedTime(selectedTime);
                                        }}>
                                    Select
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Details Appointment Section */}
                    <div className="mt-6 border rounded-lg bg-white p-4">
                        <h2 className="text-2xl font-bold text-center">Appointment Details</h2>

                        <div className="grid grid-cols-2 gap-6 mt-4">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <label className="w-32 font-bold">Type</label>
                                    <div className="p-2 border rounded bg-orange-200">
                                        PENDING
                                    </div>
                                </div>
                                <DetailRow 
                                    label="Mentor" 
                                    value={mentor} 
                                    input 
                                    onChange={(e) => setMentor(e.target.value)}
                                />
                                <DetailRow 
                                    label="Date" 
                                    value={selectedDate}
                                    datePicker
                                    onChange={handleDateChange}
                                />
                                <DetailRow 
                                    label="Topic" 
                                    value={topic} 
                                    input 
                                    onChange={(e) => setTopic(e.target.value)}
                                />
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
                                <DetailRow 
                                    label="Note" 
                                    value={note} 
                                    input 
                                    onChange={(e) => setNote(e.target.value)} 
                                />
                                <div className="flex justify-end">
                                    <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded cursor-pointer">Book</button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 text-center space-x-4">
                            <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer">Clear</button>
                            <button className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded cursor-pointer">Cancel</button>
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

const DetailRow = ({ label, value, link, highlight, input, datePicker, onChange, disabled }) => (
    <div className="flex items-center space-x-4">
        <label className="w-32 font-bold">{label}</label>
        {link ? (
            <a href={value} className="text-blue-500 underline">{value}</a>
        ) : datePicker ? (
            <DatePicker
                selected={value}
                onChange={onChange}
                className="flex-1 p-2 border rounded bg-gray-100"
                dateFormat="MMMM d, yyyy"
                minDate={new Date()}
                placeholderText="Select a date"
            />
        ) : input ? (
            <input 
                type="text" 
                value={value} 
                onChange={onChange}
                disabled={disabled}
                placeholder={`Enter ${label.toLowerCase()} here`}
                className="flex-1 p-2 border rounded placeholder-gray-400 bg-gray-100"
            />
        ) : (
            <div className={`flex-1 p-2 ${highlight ? 'bg-orange-300' : 'border rounded'}`}>
                {value instanceof Date ? value.toLocaleDateString() : value}
            </div>
        )}
    </div>
);

export default BookMentor;
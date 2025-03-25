import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';
import { viewMentorDetails } from '../../api/mentorApi';
import { getAllAppointments, getAnAppointment, requestAppointment } from '../../api/appointmentApi';
import { Header, Sidebar, NotificationPanel, Footer, SidebarButton, Notification } from '../../components/ui/StudentUi.jsx';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const BookMentor = () => {
    const { id } = useParams();
    const [mentorDetails, setMentorDetails] = useState(null);
    const [selectedSlotDate, setSelectedSlotDate] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [meetingMethod, setMeetingMethod] = useState('GOOGLE MEET');
    const [note, setNote] = useState('');
    const [status, setStatus] = useState('');
    const [mentor, setMentor] = useState('');
    const [topic, setTopic] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [matchingAppointments, setMatchingAppointments] = useState([]);
    const [userCode, setUserCode] = useState('SE100001');
    const [requestSuccess, setRequestSuccess] = useState(false);
    const [requestError, setRequestError] = useState('');

    const initialValues = {
        description: ''
    };

    const validationSchema = Yup.object({
        description: Yup.string()
            .required('Description is required')
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            if (!selectedSlotDate) {
                setRequestError('Please select a time slot first');
                return;
            }

            const { start, end } = parseAvailableTime(selectedSlotDate);
            
            const formatTimeForApi = (date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                return `${year}-${month}-${day} ${hours}:${minutes}:00.0`;
            };

            const response = await requestAppointment(
                id,
                userCode,
                formatTimeForApi(start),
                formatTimeForApi(end),
                values.description
            );

            if (response.isSuccess) {
                setRequestSuccess(true);
                resetForm();
                setSelectedSlotDate(null);
                fetchAppointments();
            } else {
                setRequestError(response.message || 'Failed to request appointment');
            }
        } catch (error) {
            console.log('An error occurred while requesting the appointment');
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchMentorDetails = async () => {
            try {
                const response = await viewMentorDetails(id);
                if (response.isSuccess) {
                    setMentorDetails(response.result);
                    setMentor(response.result.fullName);
                }
            } catch (error) {
                console.error("Failed to fetch mentor details:", error);
            }
        };

        if (id) {
            fetchMentorDetails();
        }
    }, [id]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await getAllAppointments();
                if (response.isSuccess) {
                    setAppointments(response.result);
                }
            } catch (error) {
                console.error("Failed to fetch appointments:", error);
            }
        };
        fetchAppointments();
    }, []);

    useEffect(() => {
        if (mentorDetails?.fullName && appointments.length > 0) {
            const matched = appointments.filter(app => 
                app.mentorName === mentorDetails.fullName
            );
            Promise.all(matched.map(async app => {
                try {
                    const details = await getAnAppointment(app.id);
                    return details.isSuccess ? details.result : null;
                } catch (error) {
                    console.error("Failed to fetch appointment details:", error);
                    return null;
                }
            })).then(detailedAppointments => {
                setMatchingAppointments(detailedAppointments.filter(app => app !== null));
            });
        }
    }, [mentorDetails?.fullName, appointments]);

    useEffect(() => {
        let reloadTimeout;
        if (requestSuccess) {
            reloadTimeout = setTimeout(() => {
                window.location.reload();
            }, 1000); 
        }
        return () => {
            if (reloadTimeout) {
                clearTimeout(reloadTimeout);
            }
        };
    }, [requestSuccess]);

    const parseAvailableTime = (timeString) => {
        const [start, end] = timeString.split(' - ');
        return {
            start: new Date(start),
            end: new Date(end)
        };
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('en-GB'),
            time: date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            })
        };
    };

    const formatToDateTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const parseFromDateTime = (dateString) => {
        if (!dateString) return '';
        const [date, time] = dateString.split('T');
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year} ${time}`;
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
                            <img src="/avatar_icon.png" alt="Mentor" className="w-24 h-24 rounded-full mt-3" />
                            <p className="mt-3 font-bold">{mentorDetails?.fullName || 'Loading...'}</p>
                        </div>

                        {/* Available Slots */}
                        <div className="border rounded-lg bg-white p-4">
                            <h2 className="text-2xl font-bold">Available Slots</h2>
                            <div className="mt-3 space-y-2">
                                {mentorDetails?.availableTimes?.map((timeSlot, index) => {
                                    const { start, end } = parseAvailableTime(timeSlot);
                                    return (
                                        <div
                                            key={index}
                                            className={`p-3 border rounded cursor-pointer hover:bg-orange-100 
                                                ${selectedSlotDate === timeSlot ? 'bg-orange-200' : 'bg-white'}`}
                                            onClick={() => {
                                                setSelectedSlotDate(timeSlot);
                                                setSelectedDate(start);
                                                setSelectedTime(start);
                                            }}
                                        >
                                            <div className="font-medium">{formatDate(start)}</div>
                                            <div className="text-gray-600">
                                                {formatTime(start)} - {formatTime(end)}
                                            </div>
                                        </div>
                                    );
                                })}
                                {(!mentorDetails?.availableTimes || mentorDetails.availableTimes.length === 0) && (
                                    <div className="text-center text-gray-500 py-4">
                                        No available slots
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Request Appointment Section */}
                    <div className="mt-6 border rounded-lg bg-white p-4">
                        <h2 className="text-2xl font-bold text-center mb-4">Request Appointment</h2>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched, isSubmitting, handleChange, handleBlur, values }) => (
                                <Form className="space-y-4">
                                    <div className="mb-4">
                                        <label className="block font-bold mb-2">Selected Time Slot</label>
                                        {selectedSlotDate ? (
                                            <div className="p-3 bg-orange-100 rounded">
                                                {selectedSlotDate}
                                            </div>
                                        ) : (
                                            <div className="p-3 bg-gray-100 rounded text-gray-500">
                                                Please select a time slot from available slots above
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block font-bold mb-2">Description</label>
                                        <textarea
                                            name="description"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.description}
                                            className="w-full p-2 border rounded h-24"
                                            placeholder="Enter your meeting description here..."
                                        />
                                        {errors.description && touched.description && (
                                            <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                                        )}
                                    </div>
                                    {requestError && (
                                        <div className="text-red-500 text-center">{requestError}</div>
                                    )}
                                    {requestSuccess && (
                                        <div className="text-green-500 text-center">Appointment requested successfully!</div>
                                    )}
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !selectedSlotDate}
                                            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded disabled:opacity-50"
                                        >
                                            {isSubmitting ? 'Requesting...' : 'Request Appointment'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>

                    {/* Details Appointment Section */}
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold text-center mb-4">Appointment Details</h2>
                        {matchingAppointments.length > 0 ? (
                            matchingAppointments.map((appointment, index) => (
                                <div key={index} className="border rounded-lg bg-white p-4 mb-4">
                                    <div className="grid grid-cols-2 gap-6">
                                        {/* Left Column */}
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-4">
                                                <label className="w-32 font-bold">Status</label>
                                                <div className="p-2 border rounded bg-orange-200">
                                                    {appointment.appointmentStatus}
                                                </div>
                                            </div>
                                            <DetailRow
                                                label="Mentor"
                                                value={appointment.mentorName}
                                                disabled
                                                input
                                            />
                                            <DetailRow
                                                label="Date"
                                                value={formatDateTime(appointment.date).date}
                                                highlight
                                            />
                                            <DetailRow
                                                label="Time"
                                                value={formatDateTime(appointment.date).time}
                                                highlight
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
                                                value={appointment.description}
                                                disabled
                                                input
                                            />
                                            {appointment.appointmentStatus === 'REJECTED' && appointment.rejectionReason && (
                                                <DetailRow
                                                    label="Rejection Reason"
                                                    value={appointment.rejectionReason}
                                                    highlight
                                                    className="text-red-600"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="border rounded-lg bg-white p-8">
                                <div className="text-center text-gray-500 text-lg">
                                    No appointments right now
                                </div>
                            </div>
                        )}
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
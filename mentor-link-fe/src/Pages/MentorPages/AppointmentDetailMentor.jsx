import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Sidebar, Footer, NotificationPanel } from '../../components/ui/MentorUi';
import * as appointmentApi from '../../api/appointmentApi';
import * as notificationApi from '../../api/notificationApi';
import { useAuth } from '../../context/AuthContext';

const AppointmentDetailMentor = () => {
    const { id } = useParams();
    const { auth } = useAuth();
    const [appointment, setAppointment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [rejectReason, setRejectReason] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');

    const statusOptions = ['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED'];

    useEffect(() => {
        const fetchAppointmentDetail = async () => {
            try {
                const response = await appointmentApi.getAnAppointment(id);
                if (response.isSuccess) {
                    console.log('Appointment detail loaded:', response.result);
                    setAppointment(response.result);
                } else {
                    throw new Error(response.message);
                }
            } catch (err) {
                console.error('Error fetching appointment details:', err);
                setError(err.message || 'Failed to load appointment details');
            } finally {
                setIsLoading(false);
            }
        };

        if (auth?.result?.token && id) {
            fetchAppointmentDetail();
        }
    }, [auth, id]);

    const handleStatusUpdate = async () => {
        if (!selectedStatus) {
            setUpdateMessage('Please select a status');
            return;
        }

        if (selectedStatus === 'REJECTED' && !rejectReason) {
            setUpdateMessage('Rejection reason is required');
            return;
        }

        try {
            console.log('Updating appointment status:', { id, selectedStatus, rejectReason });
            const response = await appointmentApi.updateStatusAppointment(
                id,
                selectedStatus,
                selectedStatus === 'REJECTED' ? rejectReason : undefined
            );

            if (response.isSuccess) {
                console.log('Status update successful:', response.result);
                setAppointment(response.result);
                setUpdateMessage(response.message);
                setRejectReason('');
                setSelectedStatus('');

                // Send notification to student after successful status update
                try {
                    const appointmentDetails = await appointmentApi.getAnAppointment(id);
                    if (appointmentDetails.isSuccess) {
                        const studentId = appointmentDetails.result.userCode;
                        const notificationResponse = await notificationApi.sendNotifAppointmentStudent(id, studentId);
                        console.log('Notification sent to student:', notificationResponse);
                    }
                } catch (notifError) {
                    console.error('Error sending notification:', notifError);
                }
            } else {
                console.error('Status update failed:', response.message);
                setUpdateMessage(response.message || 'Failed to update status');
            }
        } catch (err) {
            console.error('Status update error:', err);
            setUpdateMessage(err.response?.data?.message || err.message || 'Failed to update status');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-orange-50">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-8">
                    <h1 className="text-3xl font-bold text-center mb-6">APPOINTMENT DETAIL</h1>
                    
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        {isLoading && <p>Loading...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        {appointment && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-semibold">Student Name</h3>
                                        <p>{appointment.studentName}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Status</h3>
                                        <p>{appointment.appointmentStatus}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Date</h3>
                                        <p>{new Date(appointment.date).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Description</h3>
                                        <p>{appointment.description}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {appointment && (
                            <div className="mt-6 space-y-4 border-t pt-4">
                                <h3 className="font-semibold text-lg">Update Status</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block mb-2">Select Status:</label>
                                        <select 
                                            value={selectedStatus}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                            className="w-full p-2 border rounded"
                                        >
                                            <option value="">Select status...</option>
                                            {statusOptions.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {selectedStatus === 'REJECTED' && (
                                        <div>
                                            <label className="block mb-2">Rejection Reason:</label>
                                            <textarea
                                                value={rejectReason}
                                                onChange={(e) => setRejectReason(e.target.value)}
                                                className="w-full p-2 border rounded"
                                                rows="3"
                                                required
                                            />
                                        </div>
                                    )}

                                    <button
                                        onClick={handleStatusUpdate}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Update Status
                                    </button>

                                    {updateMessage && (
                                        <div className={`p-2 rounded ${
                                            !appointment?.appointmentStatus || updateMessage.includes('Failed') || updateMessage.includes('required')
                                            ? 'bg-red-100 text-red-700' 
                                            : 'bg-green-100 text-green-700'
                                        }`}>
                                            {updateMessage}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
                <NotificationPanel />
            </div>
            <Footer />
        </div>
    );
};

export default AppointmentDetailMentor;

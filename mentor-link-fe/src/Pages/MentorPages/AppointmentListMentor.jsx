import React, { useState, useEffect } from 'react';
import { Header, Sidebar, Footer } from '../../components/ui/MentorUi';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as appointmentApi from '../../api/appointmentApi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AppointmentListMentor = () => {
    const { auth } = useAuth();
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await appointmentApi.getAllAppointments();
                console.log(response)
                if (response.isSuccess) {
                    // Transform appointments into calendar events
                    const calendarEvents = response.result.map(appointment => ({
                        id: appointment.id,
                        title: `${appointment.studentName} - ${appointment.description}`,
                        start: appointment.date,
                        end: new Date(new Date(appointment.date).getTime() + 60*60*1000), // Add 1 hour duration
                        extendedProps: {
                            status: appointment.appointmentStatus,
                            mentorName: appointment.mentorName,
                            studentName: appointment.studentName,
                            description: appointment.description
                        }
                    }));
                    setEvents(calendarEvents);
                } else {
                    throw new Error(response.message);
                }
            } catch (err) {
                console.error('Error fetching appointments:', err);
                setError(err.message || 'Failed to load appointments');
            } finally {
                setIsLoading(false);
            }
        };

        if (auth?.result?.token) {
            fetchAppointments();
        }
    }, [auth]);

    const handleDateSelect = (selectInfo) => {
        const title = prompt('Please enter appointment title');
        if (title) {
            const newEvent = {
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
            };
            setEvents([...events, newEvent]);
        }
    };

    const handleEventClick = (clickInfo) => {
        const appointmentId = clickInfo.event.id;
        navigate(`/appointment-detail-mentor/${appointmentId}`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-orange-50">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-8">
                    <h1 className="text-3xl font-bold text-center mb-6">APPOINTMENT LIST</h1>
                    
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth'
                            }}
                            initialView="dayGridMonth"
                            selectable={true}
                            editable={true}
                            events={events}
                            select={handleDateSelect}
                            eventClick={handleEventClick}
                            height="auto"
                            className="rounded-lg overflow-hidden [&.fc]:bg-white [&.fc]:rounded-lg [&.fc]:p-4 
                                     [&_.fc-toolbar-title]:text-xl [&_.fc-toolbar-title]:font-semibold
                                     [&_.fc-button]:bg-blue-500 [&_.fc-button]:border-0 [&_.fc-button]:capitalize [&_.fc-button]:px-4 [&_.fc-button]:py-2 
                                     [&_.fc-button:hover]:bg-blue-600
                                     [&_.fc-event]:bg-blue-500 [&_.fc-event]:border-0 [&_.fc-event]:rounded [&_.fc-event]:p-1"
                        />
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default AppointmentListMentor;

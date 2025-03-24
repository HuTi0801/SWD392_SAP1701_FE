import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Header, Sidebar, NotificationPanel, Footer, InfoCard, DeadlineItem } from '../../components/ui/StudentUi.jsx';
import * as projectApi from '../../api/projectApi.js';

const HomeStudent = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Debug authentication state
        console.group('Auth Debug Info');
        console.log('Auth context value:', auth);
        console.log('LocalStorage auth:', localStorage.getItem('auth'));
        console.groupEnd();

        if (!auth) {
            console.log('No auth data found, redirecting to login');
            navigate('/login');
            return;
        }

        const fetchProjects = async () => {
            setLoading(true);
            try {
                const response = await projectApi.getAllProjectsLecturer();
                const projectsArray = response?.result || [];
                setProjects(projectsArray);
            } catch (err) {
                console.error("Failed to fetch projects:", err);
                setError("Failed to load projects");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [navigate, auth]);

    const FeaturedProjectCard = ({ project }) => (
        <div className="mt-4 flex bg-white shadow-lg p-4">
            <img
                className="w-1/3 object-cover rounded-lg"
                src={"/fpt_logo_rect.png"}
                alt={project.topic || "Project Preview"}
            />
            <div className="flex-1 ml-4">
                <h3 className="text-2xl font-bold text-[#FF9E6D]">{project.topic}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-orange-50">
            <Header />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />

                {/* Main Content - Added overflow-y-auto */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <InfoCard title="Upcoming Deadline" icon="📅">
                            <DeadlineItem title="Report 1" date="10.02.2024" />
                            <DeadlineItem title="Checkpoint 1" date="15.02.2024" />
                        </InfoCard>

                        <InfoCard title="Upcoming Appointment" icon="📅">
                            <p className="text-[#FF9E6D] font-bold">Mentor: Mr. Hoang Nguyen The</p>
                            <p>05.02.2024 - 14:00</p>
                        </InfoCard>
                    </div>

                    <h2 className="text-xl font-bold mb-4">🚀 Featured Projects</h2>

                    <div className="space-y-4 pb-6">
                        {loading ? (
                            <div className="text-center">Loading projects...</div>
                        ) : error ? (
                            <div className="text-center text-red-500">{error}</div>
                        ) : projects.length > 0 ? (
                            projects.map((project) => (
                                <FeaturedProjectCard key={project.id} project={project} />
                            ))
                        ) : (
                            <div className="text-center">No featured projects available</div>
                        )}
                    </div>
                </div>

                <NotificationPanel />
            </div>

            <Footer />
        </div>
    );
};

export default HomeStudent;
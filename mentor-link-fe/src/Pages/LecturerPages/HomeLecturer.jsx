import React, { useState, useEffect } from "react";
import { Header, Sidebar, Footer } from "../../components/ui/LecturerUi";
import { useNavigate } from "react-router-dom";
import * as projectApi from "../../api/projectApi.js";

const HomeLecturer = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await projectApi.getAllProjectsLecturer();
                const projectsArray = response?.result || [];
                setProjects(projectsArray.slice(0, 3)); // Only take first 3 projects
            } catch (error) {
                console.error("Failed to fetch projects:", error);
                setError("Failed to load projects");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-10 bg-orange-50">
                    <h1 className="text-4xl font-semibold mb-6">Your Projects</h1>

                    {isLoading ? (
                        <div className="text-center">Loading projects...</div>
                    ) : error ? (
                        <div className="text-center text-red-500">{error}</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {projects.map((project) => (
                                    <ProjectCard 
                                        key={project.id} 
                                        project={project} 
                                        navigate={navigate}
                                    />
                                ))}
                            </div>

                            <div className="text-center mt-6">
                                <button
                                    onClick={() => navigate('/project-list-lecturer')}
                                    className="bg-orange-400 hover:bg-orange-500 transition-colors duration-200 text-white px-10 py-2 rounded-lg font-semibold cursor-pointer text-xl"
                                >
                                    More
                                </button>
                            </div>
                        </>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

const ProjectCard = ({ project, navigate }) => (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="h-100 bg-gray-300 flex justify-center items-center">
            <span className="text-lg font-semibold">Project Image</span>
        </div>
        <div className="p-6 bg-orange-200 min-h-[250px] flex flex-col justify-between">
            <div>
                <h2 className="text-2xl font-bold mb-4">{project.topic}</h2>
                <p className="text-gray-700 italic">{project.description}</p>
            </div>
            <button
                onClick={() => navigate(`/project-detail-lecturer`)}
                className="mt-4 bg-orange-400 hover:bg-orange-500 transition-colors duration-200 text-white px-4 py-2 rounded-lg cursor-pointer"
            >
                Detail
            </button>
        </div>
    </div>
);

export default HomeLecturer;

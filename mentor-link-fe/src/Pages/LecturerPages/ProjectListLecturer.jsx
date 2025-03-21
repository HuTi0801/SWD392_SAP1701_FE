import React, { useState, useEffect } from "react";
import { Header, Sidebar, Footer } from "../../components/ui/LecturerUi";
import * as projectApi from "../../api/projectApi.js";

const ProjectListLecturer = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectApi.getAllProjectsLecturer();
        const projectsArray = response?.result || [];
        setProjects(projectsArray);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setError("Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-grow p-8 ">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">PROJECT LIST</h1>
            <span className="text-lg">Total Projects: {projects?.length || 0}</span>
          </div>
          <div className="bg-orange-200 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-bold">Filter</h2>
            <div className="mt-2 flex gap-2 ">
              <input type="text" placeholder="Major" className="p-2 rounded bg-white" />
              <input type="text" placeholder="Semester" className="p-2 rounded bg-white" />
              <input type="text" placeholder="Status" className="p-2 rounded bg-white" />
            </div>
          </div>
          {isLoading ? (
            <div className="text-center">Loading projects...</div>
          ) : (
            Array.isArray(projects) && projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="text-center">No projects found</div>
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ProjectCard = ({ project }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-500';
      case 'APPROVED': return 'bg-green-500';
      case 'REJECTED': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex bg-orange-200 rounded-lg p-4 mb-4 h-70">
      <img src="/placeholder.jpg" alt="Project" className="w-1/3 rounded-lg" />
      <div className="ml-4 flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-bold">{project.topic}</h3>
          <span className={`px-2 py-1 text-white rounded-full text-sm ${getStatusColor(project.projectStatus)}`}>
            {project.projectStatus}
          </span>
        </div>
        <p className="mt-2">{project.description}</p>
        <button className="mt-2 bg-orange-500 text-white rounded px-4 py-2">Detail</button>
      </div>
    </div>
  );
};

export default ProjectListLecturer;
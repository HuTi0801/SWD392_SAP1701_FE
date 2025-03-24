import React, { useState, useEffect } from "react";
import { Header, Sidebar, Footer, NotificationPanel } from "../../components/ui/LecturerUi";
import FilterComponents from "../../components/common/FilterComponents";
import * as projectApi from "../../api/projectApi.js";
import { useNavigate } from "react-router-dom";

const FilterSearch = ({ filters, onFilterChange }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
    <div className="flex gap-4 mb-4">
      <FilterComponents.SearchBar
        value={filters.topic}
        onChange={(e) => onFilterChange("topic", e.target.value)}
        placeholder="Search by topic..."
      />
      <FilterComponents.FilterDropdown>
        <div className="grid grid-cols-2 gap-4">
          <FilterComponents.FilterInput
            label="Major"
            type="text"
            name="major"
            value={filters.major}
            onChange={(e) => onFilterChange("major", e.target.value)}
            placeholder="Filter by major"
          />
          <FilterComponents.FilterInput
            label="Semester"
            type="text"
            name="semester"
            value={filters.semester}
            onChange={(e) => onFilterChange("semester", e.target.value)}
            placeholder="Filter by semester"
          />
          <FilterComponents.FilterInput
            label="Status"
            type="select"
            name="status"
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
            options={["PENDING", "APPROVED", "REJECTED"]}
          />
        </div>
      </FilterComponents.FilterDropdown>
    </div>
  </div>
);

const getStatusColor = (status) => {
  switch (status) {
    case 'PENDING': return 'bg-yellow-500';
    case 'APPROVED': return 'bg-green-500';
    case 'REJECTED': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const ProjectCard = ({ project }) => {
  const navigate = useNavigate(); // Add this line at the top

  return (
    <div className="bg-orange-200 rounded-lg p-6 flex shadow-md  mb-4">
      <img src="/fpt_logo_square.jpg" alt="Project" className="w-40 h-40 rounded-lg object-cover" />
      <div className="ml-6 flex-1">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-bold">{project.topic}</h3>
          <span className={`px-3 py-1 text-white rounded-full ${getStatusColor(project.projectStatus)}`}>
            {project.projectStatus}
          </span>
        </div>
        <p className="mt-2">{project.description}</p>
        <button 
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer transition-colors duration-200"
          onClick={() => navigate(`/project-detail-lecturer/${project.id}`)}
        >
          Detail
        </button>
      </div>
    </div>
  );
};

const ProjectListLecturer = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    topic: "",
    major: "",
    semester: "",
    status: "",
  });

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

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">PROJECT LIST</h1>
            <span className="text-lg">Total Projects: {projects?.length || 0}</span>
          </div>
          <FilterSearch filters={filters} onFilterChange={handleFilterChange} />
          {isLoading ? (
            <div className="text-center">Loading projects...</div>
          ) : (
            Array.isArray(projects) && projects.length > 0 ? (
              <div className="space-y-4">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center">No projects found</div>
            )
          )}
        </main>
        <NotificationPanel />
      </div>
      <Footer />
    </div>
  );
};

export default ProjectListLecturer;
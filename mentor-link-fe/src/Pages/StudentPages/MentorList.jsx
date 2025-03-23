import React, { useState, useEffect } from "react";
import { Header, Sidebar, Footer } from "../../components/ui/StudentUi";
import FilterComponents from "../../components/common/FilterComponents";
import { useNavigate } from "react-router-dom";
import { mentorGetAll } from "../../api/mentorApi";

// Remove const mentors array

const FilterSearch = ({ filters, onFilterChange }) => (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex gap-4 mb-4">
            <FilterComponents.SearchBar
                value={filters.expertise}
                onChange={(e) => onFilterChange("expertise", e.target.value)}
            />
            <FilterComponents.FilterDropdown>
                <div className="grid grid-cols-2 gap-4">
                    <FilterComponents.FilterInput
                        label="Minimum Rating"
                        type="number"
                        name="minRating"
                        value={filters.minRating}
                        onChange={(e) => onFilterChange("minRating", e.target.value)}
                        placeholder="Min"
                        min="0"
                        max="5"
                    />
                    <FilterComponents.FilterInput
                        label="Maximum Rating"
                        type="number"
                        name="maxRating"
                        value={filters.maxRating}
                        onChange={(e) => onFilterChange("maxRating", e.target.value)}
                        placeholder="Max"
                        min="0"
                        max="5"
                    />
                    <FilterComponents.FilterInput
                        label="Years of Experience"
                        type="number"
                        name="year"
                        value={filters.year}
                        onChange={(e) => onFilterChange("year", e.target.value)}
                        placeholder="Minimum years"
                        min="0"
                    />
                    <FilterComponents.FilterInput
                        label="Start Time"
                        type="time"
                        name="startTime"
                        value={filters.startTime}
                        onChange={(e) => onFilterChange("startTime", e.target.value)}
                    />
                    <FilterComponents.FilterInput
                        label="End Time"
                        type="time"
                        name="endTime"
                        value={filters.endTime}
                        onChange={(e) => onFilterChange("endTime", e.target.value)}
                    />
                </div>
            </FilterComponents.FilterDropdown>
        </div>
    </div>
);

const MentorCard = ({ mentor }) => {
    const navigate = useNavigate();
    
    return (
        <div className="border-2 border-orange-300 rounded-lg p-6 flex shadow-md">
            <img
                src="/avatar_icon.png"
                alt={mentor.fullName}
                className="w-40 h-40 rounded-lg object-cover"
            />
            <div className="ml-6 flex-1">
                <p className="font-semibold">Name: {mentor.fullName}</p>
                <p className="font-semibold">Email: {mentor.email}</p>
                <p className="font-semibold">Expertise: 
                    <span className="ml-2">{mentor.expertise.join(", ")}</span>
                </p>
                <div className="mt-4 flex items-center">
                    <span className="text-green-600 text-3xl font-bold">
                        {mentor.rating}
                    </span>
                    <span className="ml-2 text-gray-700">Rating</span>
                </div>
                <button 
                    className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                    onClick={() => navigate(`/book-mentor/${mentor.id}`)}
                >
                    Detail
                </button>
            </div>
        </div>
    );
};

const MentorList = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        expertise: "",
        minRating: "",
        maxRating: "",
        year: "",
        startTime: "",
        endTime: "",
    });

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const data = await mentorGetAll();
                setMentors(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to fetch mentors:", error);
                setMentors([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMentors();
    }, []);

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-8">
                    <h1 className="text-3xl font-bold mb-6 text-center">MENTOR LIST</h1>
                    <FilterSearch filters={filters} onFilterChange={handleFilterChange} />
                    <div className="space-y-6">
                        {loading ? (
                            <p className="text-center">Loading mentors...</p>
                        ) : mentors.length === 0 ? (
                            <p className="text-center">No mentors found</p>
                        ) : (
                            mentors.map((mentor, index) => (
                                <MentorCard key={index} mentor={mentor} />
                            ))
                        )}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default MentorList;
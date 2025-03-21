import React, { useState } from "react";
import { Header, Sidebar, Footer } from "../../components/ui/StudentUi";
import FilterComponents from "../../components/common/FilterComponents";

const mentors = [
    {
        name: "Nguyen Tram Phuc Duyen",
        education: "FPT University",
        major: "Software Engineer",
        experience: 3,
        image: "/mentor.jpg",
    },
];

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

const MentorCard = ({ mentor }) => (
    <div className="bg-orange-300 rounded-lg p-6 flex shadow-md">
        <img
            src={mentor.image}
            alt={mentor.name}
            className="w-40 h-40 rounded-lg object-cover"
        />
        <div className="ml-6 flex-1">
            <p className="font-semibold">Name: {mentor.name}</p>
            <p className="font-semibold">Education: {mentor.education}</p>
            <p className="font-semibold">Major: {mentor.major}</p>
            <div className="mt-4 flex items-center">
                <span className="text-green-600 text-3xl font-bold">
                    {mentor.experience.toString().padStart(2, "0")}
                </span>
                <span className="ml-2 text-gray-700">Years of Experience</span>
            </div>
            <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg">
                Detail
            </button>
        </div>
    </div>
);

const MentorList = () => {
    const [filters, setFilters] = useState({
        expertise: "",
        minRating: "",
        maxRating: "",
        year: "",
        startTime: "",
        endTime: "",
    });

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
                        {mentors.map((mentor, index) => (
                            <MentorCard key={index} mentor={mentor} />
                        ))}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default MentorList;
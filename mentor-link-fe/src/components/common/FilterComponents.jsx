import React from 'react';
import { Menu } from '@headlessui/react';
import { BsFilter, BsSearch } from 'react-icons/bs';

const FilterInput = ({ label, type, name, value, onChange, placeholder, min, max }) => (
    <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            min={min}
            max={max}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
    </div>
);

const FilterDropdown = ({ children }) => (
    <Menu as="div" className="relative">
        <Menu.Button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md hover:bg-gray-50">
            <BsFilter className="text-lg" />
            Filters
        </Menu.Button>
        <Menu.Items className="absolute right-0 mt-2 w-96 bg-white rounded-md shadow-lg p-4 z-10">
            {children}
        </Menu.Items>
    </Menu>
);

const SearchBar = ({ value, onChange }) => (
    <div className="relative">
        <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
    </div>
);

const FilterComponents = {
    FilterInput,
    FilterDropdown,
    SearchBar
};

export default FilterComponents;

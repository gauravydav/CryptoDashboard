import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ selectedAsset, setSelectedAsset, assets }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Handle dropdown clicks outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="flex justify-between items-center bg-gray-800 text-white p-4 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold">Cryptocurrency Dashboard</h1>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    {selectedAsset.charAt(0).toUpperCase() + selectedAsset.slice(1)}
                </button>
                {dropdownOpen && (
                    <ul className="absolute right-0 bg-gray-800 text-white border border-gray-700 mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto w-full z-10">
                        {assets.map((asset) => (
                            <li
                                key={asset}
                                onClick={() => {
                                    setSelectedAsset(asset);
                                    setDropdownOpen(false);
                                }}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                            >
                                {asset.charAt(0).toUpperCase() + asset.slice(1)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <nav className="space-x-4">
                <Link to="/dashboard" className="text-white">Dashboard</Link>
                <Link to="/overview" className="text-white">Overview</Link>
                <Link to="/history" className="text-white">History</Link>
            </nav>
        </header>
    );
};

export default Header;

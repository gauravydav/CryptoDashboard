import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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

    const assetName = selectedAsset ? selectedAsset.charAt(0).toUpperCase() + selectedAsset.slice(1) : 'Loading...';

    return (
        <header className="flex justify-between items-center bg-gray-800 text-white p-4 rounded-lg shadow-xl">
            <h1 className="text-3xl font-semibold">Cryptocurrency Dashboard</h1>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none"
                >
                    {assetName}
                </button>
                {dropdownOpen && (
                    <ul className="absolute right-0 bg-gray-800 text-white border border-gray-700 mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto w-48 z-10">
                        {assets.map((asset) => (
                            <li
                                key={asset}
                                onClick={() => {
                                    setSelectedAsset(asset);
                                    setDropdownOpen(false);
                                }}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-700 transition duration-150"
                            >
                                {asset.charAt(0).toUpperCase() + asset.slice(1)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <nav className="space-x-4">
                <Link to="/" className="text-white hover:text-blue-400 transition duration-200">Dashboard</Link>
                <Link to="/overview" className="text-white hover:text-blue-400 transition duration-200">Overview</Link>
                <Link to="/history" className="text-white hover:text-blue-400 transition duration-200">History</Link>
            </nav>
        </header>
    );
};

Header.propTypes = {
    selectedAsset: PropTypes.string.isRequired,
    setSelectedAsset: PropTypes.func.isRequired,
    assets: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Header;

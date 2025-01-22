import React from 'react';

const Footer = ({ lastUpdated }) => {
    return (
        <footer className="mt-12 text-center text-gray-500 text-sm">
            <p>Last updated: {lastUpdated ? lastUpdated : 'Fetching...'}</p>
        </footer>
    );
};

export default Footer;

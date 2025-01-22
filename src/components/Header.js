import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl">Crypto Tracker</h1>
      <div className="flex gap-4">
        <select className="p-2 rounded-md">
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          {/* Add more cryptocurrencies here */}
        </select>
        <nav className="flex gap-4">
          <Link to="/dashboard" className="text-white">Dashboard</Link>
          <Link to="/overview" className="text-white">Overview</Link>
          <Link to="/history" className="text-white">History</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

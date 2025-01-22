import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './routes/Dashboard';
import Overview from './routes/Overview';
import History from './routes/History';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './routes/Dashboard';
import Overview from './routes/Overview';
import History from './routes/History';

const App = () => {
    return (
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/history" element={<History />} />
            </Routes>
    );
};

export default App;

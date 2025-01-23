import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(
    CategoryScale,  
    LinearScale, 
    PointElement,   
    LineElement,    
    Title,          
    Tooltip,        
    Legend         
);

const PriceChart = ({ priceHistory }) => {
    if (!priceHistory || priceHistory.length === 0) {
        return <div>No historical data available.</div>;  
    }

    const chartData = {
        labels: priceHistory.map((entry) => entry.time), 
        datasets: [
            {
                label: 'Price Trend (Last 7 Days)',
                data: priceHistory.map((entry) => entry.price),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Price Trend (Last 7 Days)</h3>
            <div className="h-72">
                <Line data={chartData} />
            </div>
        </div>
    );
};

export default PriceChart;

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components from Chart.js
ChartJS.register(
    CategoryScale,  // For the x-axis with categories
    LinearScale,    // For the y-axis with linear scaling
    PointElement,   // For the point elements (circle dots on the line)
    LineElement,    // For the line itself
    Title,          // For chart title
    Tooltip,        // For tooltips
    Legend          // For legend
);

const PriceChart = ({ priceHistory }) => {
    const chartData = {
        labels: priceHistory.map((entry) => entry.time), // Assuming 'time' is the timestamp or date
        datasets: [
            {
                label: 'Price Trend (Last 7 Days)',
                data: priceHistory.map((entry) => entry.price), // Assuming 'price' is the value
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

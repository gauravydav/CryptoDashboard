import React from 'react';
import { Line } from 'react-chartjs-2';

const PriceChart = ({ priceHistory }) => {
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

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAsset } from '../redux/slices/cryptoSlice';
import { Button, Typography } from '@mui/material';
import Chart from 'chart.js/auto';

const History = () => {
    const dispatch = useDispatch();
    const { selectedAsset } = useSelector((state) => state.crypto);
    const [historicalData, setHistoricalData] = useState([]);

    useEffect(() => {
        // Fetch historical data (Example: Fetch OHLCV data)
        fetch(`https://api.coincap.io/v2/candles?exchange=binance&interval=h1&baseId=${selectedAsset}&quoteId=bitcoin`)
            .then((response) => response.json())
            .then((data) => {
                setHistoricalData(data.data);
                // You can create your Chart.js chart here
            })
            .catch((error) => {
                console.error("Error fetching historical data:", error);
            });
    }, [selectedAsset]);

    useEffect(() => {
        // Initialize your chart if needed
        if (historicalData.length > 0) {
            const ctx = document.getElementById('chartCanvas').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: historicalData.map(item => new Date(item.timestamp).toLocaleTimeString()),
                    datasets: [{
                        label: 'Price',
                        data: historicalData.map(item => item.close),
                    }],
                },
            });
        }
    }, [historicalData]);

    return (
        <div>
            <Typography variant="h3" gutterBottom>
                Cryptocurrency History
            </Typography>

            <div>
                <Button onClick={() => dispatch(setSelectedAsset('bitcoin'))}>Bitcoin</Button>
                <Button onClick={() => dispatch(setSelectedAsset('ethereum'))}>Ethereum</Button>
                {/* Add more buttons for other assets */}
            </div>

            <canvas id="chartCanvas" width="400" height="200"></canvas>
        </div>
    );
};

export default History;

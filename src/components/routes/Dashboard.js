import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPriceSocket } from '../../services/websocket';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import PriceChart from '../PriceChart';
import { setPriceData, fallbackToCachedData } from '../../redux/slices/cryptoSlice';


const Dashboard = () => {
    const dispatch = useDispatch();
    const assets = ['bitcoin', 'ethereum', 'monero', 'litecoin'];
    const [selectedAsset, setSelectedAsset] = useState('bitcoin');
    const [priceChange24h, setPriceChange24h] = useState(null);
    const [priceHistory, setPriceHistory] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(null);

    const priceData = useSelector((state) => state.crypto.priceData[selectedAsset]);

    const fetchPriceChange24h = async (asset) => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${asset}`);
            const data = response.data.market_data;
            const change = data.price_change_percentage_24h_in_currency.usd;
            setPriceChange24h(change);
        } catch (error) {
            console.error('Error fetching 24h price change:', error);
            dispatch(fallbackToCachedData(asset)); 
        }
    };
    

    const fetchPriceHistory = async (asset) => {
        try {
            const response = await axios.get(
                `https://api.coingecko.com/api/v3/coins/${asset}/market_chart`,
                {
                    params: { vs_currency: 'usd', days: 7 },
                }
            );
            const history = response.data.prices.map(([timestamp, price]) => ({
                time: new Date(timestamp).toLocaleDateString(),
                price,
            }));
            setPriceHistory(history);
        } catch (error) {
            console.error('Error fetching price history:', error);
        }
    };

    const updateLastUpdated = () => {
        setLastUpdated(new Date().toLocaleString());
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchPriceChange24h(selectedAsset);
            fetchPriceHistory(selectedAsset);
            updateLastUpdated();
        }, 2000);

        return () => clearInterval(interval);
    }, [selectedAsset]);

    useEffect(() => {
        createPriceSocket(assets, dispatch);

        return () => {
            console.log('Cleanup WebSocket connection');
        };
    }, []);

    return (
        <div className="container mx-auto px-4 py-6">
            <Header
                selectedAsset={selectedAsset}
                setSelectedAsset={setSelectedAsset}
                assets={assets}
            />
            <main className="mt-8">
                <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Selected Asset: {selectedAsset}</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-lg font-medium">Current Price:</span>
                            <span className="text-lg">
                                {priceData !== undefined ? `$${priceData}` : 'No recent data'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-lg font-medium">24h Change:</span>
                            <span
                                className={`text-lg ${
                                    priceChange24h < 0 ? 'text-red-500' : 'text-green-500'
                                }`}
                            >
                                {priceChange24h !== null ? `${priceChange24h.toFixed(2)}%` : 'Not available'}
                            </span>
                        </div>
                    </div>
                </div>
                <PriceChart priceHistory={priceHistory} />
            </main>
            <Footer lastUpdated={lastUpdated} />
        </div>
    );
};

export default Dashboard;

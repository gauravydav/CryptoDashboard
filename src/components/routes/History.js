import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';

const History = () => {
    const dispatch = useDispatch();
    const assets = ['bitcoin', 'ethereum', 'monero', 'litecoin'];
    const [selectedAsset, setSelectedAsset] = useState('bitcoin'); // State for selected asset
    const [historicalData, setHistoricalData] = useState([]);
    const [filterPrice, setFilterPrice] = useState(''); // Filter state for price
    const [filterVolume, setFilterVolume] = useState(''); // Filter state for volume
    const [lastUpdated, setLastUpdated] = useState(null);

    // Fetch historical price data
    const fetchHistoricalData = async (asset) => {
        try {
            const response = await axios.get(
                `https://api.coingecko.com/api/v3/coins/${asset}/market_chart`,
                {
                    params: { vs_currency: 'usd', days: 7 },
                }
            );
            const data = response.data.prices.map(([timestamp, price], index) => ({
                date: new Date(timestamp).toLocaleDateString(),
                price,
                volume: response.data.total_volumes[index][1], // Volume for 24h
            }));
            setHistoricalData(data);
        } catch (error) {
            console.error('Error fetching historical data:', error);
        }
    };

    // Update last updated timestamp
    const updateLastUpdated = () => {
        setLastUpdated(new Date().toLocaleString());
    };

    // Effect for fetching data when selected asset changes
    useEffect(() => {
        fetchHistoricalData(selectedAsset);
        updateLastUpdated();
    }, [selectedAsset]);

    // Filter the historical data based on price and volume
    const filteredData = historicalData.filter((entry) => {
        const priceMatch = !filterPrice || entry.price >= filterPrice;
        const volumeMatch = !filterVolume || entry.volume >= filterVolume;
        return priceMatch && volumeMatch;
    });

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

                    {/* Filter inputs */}
                    <div className="space-x-4 mb-6">
                        <input
                            type="number"
                            className="p-2 border rounded"
                            placeholder="Filter by price"
                            value={filterPrice}
                            onChange={(e) => setFilterPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            className="p-2 border rounded"
                            placeholder="Filter by volume"
                            value={filterVolume}
                            onChange={(e) => setFilterVolume(e.target.value)}
                        />
                    </div>

                    {/* Display historical data */}
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Date</th>
                                <th className="border px-4 py-2">Price (USD)</th>
                                <th className="border px-4 py-2">24h Volume</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((entry, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{entry.date}</td>
                                    <td className="border px-4 py-2">${entry.price.toFixed(2)}</td>
                                    <td className="border px-4 py-2">{entry.volume.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer lastUpdated={lastUpdated} />
        </div>
    );
};

export default History;

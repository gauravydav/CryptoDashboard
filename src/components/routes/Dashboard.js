import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistoricalData, fetchPriceChange24h, setSelectedAsset } from '../../redux/slices/cryptoSlice';
import { createPriceSocket } from '../../services/websocket';
import Header from '../Header';
import Footer from '../Footer';
import PriceChart from '../PriceChart';

const Dashboard = () => {
    const dispatch = useDispatch();
    const assets = ['bitcoin', 'ethereum', 'monero', 'litecoin'];
    const [lastUpdated, setLastUpdated] = useState(null);

    const selectedAsset = useSelector(state => state.crypto.selectedAsset);
    const priceData = useSelector(state => state.crypto.priceData[selectedAsset]);
    const historicalData = useSelector(state => state.crypto.historicalData[selectedAsset]);
    const priceChange24h = useSelector(state => state.crypto.priceChange24h[selectedAsset]);

    useEffect(() => {
        dispatch(fetchHistoricalData(selectedAsset));
        dispatch(fetchPriceChange24h(selectedAsset)); 
        setLastUpdated(new Date().toLocaleString());
    }, [dispatch, selectedAsset]);

    useEffect(() => {
        createPriceSocket(assets, dispatch);
    }, [dispatch]);

    return (
        <div className="container mx-auto px-4 py-6">
            <Header
                selectedAsset={selectedAsset}
                setSelectedAsset={(asset) => dispatch(setSelectedAsset(asset))}
                assets={assets}
            />
            <main className="mt-8">
                <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Selected Asset: {selectedAsset}</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-lg font-medium">Current Price:</span>
                            <span className="text-lg">
                                {priceData ? `$${priceData}` : 'No recent data'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-lg font-medium">24h Price Change:</span>
                            <span className="text-lg">
                                {priceChange24h !== undefined ? `${priceChange24h.toFixed(2)}%` : 'No data available'}
                            </span>
                        </div>
                    </div>
                </div>

                {historicalData && historicalData.length > 0 ? (
                    <PriceChart priceHistory={historicalData} />
                ) : (
                    <div>No historical data available.</div>
                )}
            </main>
            <Footer lastUpdated={lastUpdated} />
        </div>
    );
};

export default Dashboard;

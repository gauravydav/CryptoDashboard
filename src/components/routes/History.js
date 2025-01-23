import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistoricalData, setSelectedAsset } from '../../redux/slices/cryptoSlice';
import Header from '../Header';
import Footer from '../Footer';

const History = () => {
    const dispatch = useDispatch();
    const selectedAsset = useSelector(state => state.crypto.selectedAsset);
    const historicalData = useSelector(state => state.crypto.historicalData[selectedAsset]);
    console.log(historicalData)
    const [filterPrice, setFilterPrice] = useState('');
    const [filterVolume, setFilterVolume] = useState('');

    useEffect(() => {
        dispatch(fetchHistoricalData(selectedAsset));
    }, [dispatch, selectedAsset]);

    const filteredData = historicalData?.filter((entry) => {
        const priceMatch = !filterPrice || entry.price >= filterPrice;
        const volumeMatch = !filterVolume || entry.volume >= filterVolume; 
        return priceMatch && volumeMatch;
    });

    return (
        <div className="container mx-auto px-4 py-6">
            <Header
                selectedAsset={selectedAsset}
                setSelectedAsset={(asset) => dispatch(setSelectedAsset(asset))}
                assets={['bitcoin', 'ethereum', 'monero', 'litecoin']}
            />
            <main className="mt-8">
                <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Selected Asset: {selectedAsset}</h2>
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
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Date</th>
                                <th className="border px-4 py-2">Price (USD)</th>
                                <th className="border px-4 py-2">Volume</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData?.map((entry, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{entry.time}</td>
                                    <td className="border px-4 py-2">${entry.price?.toFixed(2)}</td>
                                    <td className="border px-4 py-2">{entry.volume?.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer lastUpdated={new Date().toLocaleString()} />
        </div>
    );
};

export default History;

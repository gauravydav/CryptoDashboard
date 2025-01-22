import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setOverviewData, setSelectedAsset } from '../../redux/slices/cryptoSlice'; // Import Redux actions
import Header from '../Header';  // Import the Header component

// Function to fetch overview data
const fetchOverviewData = async (selectedAsset, dispatch) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${selectedAsset}`);
        const data = response.data;

        // Extract the necessary details from the response
        const overview = {
            marketCap: data.market_data.market_cap.usd,
            totalSupply: data.market_data.total_supply,
            circulatingSupply: data.market_data.circulating_supply,
            allTimeHigh: data.market_data.ath.usd,
            rank: data.coins_rank,
            description: data.description.en,
        };

        // Dispatch the data to Redux store
        dispatch(setOverviewData(overview));
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
    }
};

const Overview = () => {
    const dispatch = useDispatch();
    const selectedAsset = useSelector(state => state.crypto.selectedAsset);  // Access the selected cryptocurrency
    const overviewData = useSelector(state => state.crypto.overviewData);  // Access the overview data from Redux
    const assets = ['bitcoin', 'ethereum', 'dogecoin', 'litecoin']; // List of assets for the dropdown

    // Fetch the overview data when the selected asset changes
    useEffect(() => {
        fetchOverviewData(selectedAsset, dispatch);  // Fetch data for the selected asset
    }, [selectedAsset, dispatch]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-xl">
            {/* Include Header */}
            <Header selectedAsset={selectedAsset} setSelectedAsset={(asset) => dispatch(setSelectedAsset(asset))} assets={assets} />

            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6 mt-4">Overview of {selectedAsset.charAt(0).toUpperCase() + selectedAsset.slice(1)}</h2>
            {overviewData ? (
                <div className="space-y-4 text-lg text-gray-700">
                    <div className="flex justify-between">
                        <span className="font-semibold">Market Cap:</span>
                        <span>${overviewData.marketCap}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Total Supply:</span>
                        <span>{overviewData.totalSupply}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Circulating Supply:</span>
                        <span>{overviewData.circulatingSupply}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">All-Time High:</span>
                        <span>${overviewData.allTimeHigh}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Rank:</span>
                        <span>{overviewData.rank}</span>
                    </div>
                    <div className="mt-4 text-gray-600">
                        <h3 className="text-xl font-semibold">Description:</h3>
                        <div className="mt-2" dangerouslySetInnerHTML={{ __html: overviewData.description }} />
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">Loading overview data...</p>  // Loading state if data isn't available yet
            )}
        </div>
    );
};

export default Overview;

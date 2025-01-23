import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPriceData, setSelectedAsset,  fetchOverviewData  } from '../../redux/slices/cryptoSlice';
import Header from '../Header';

const Overview = () => {
    const dispatch = useDispatch();
    const selectedAsset = useSelector(state => state.crypto.selectedAsset);
    const overviewData = useSelector(state => state.crypto.overviewData);
    const assets = ['bitcoin', 'ethereum', 'dogecoin', 'litecoin'];

    useEffect(() => {
        dispatch(fetchPriceData(selectedAsset));
        dispatch(fetchOverviewData(selectedAsset));
    }, [dispatch, selectedAsset]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-xl">
            <Header
                selectedAsset={selectedAsset}
                setSelectedAsset={(asset) => dispatch(setSelectedAsset(asset))}
                assets={assets}
            />
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6 mt-4">
                Overview of {selectedAsset.charAt(0).toUpperCase() + selectedAsset.slice(1)}
            </h2>
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
                    <div className="flex justify-between">
                    <span className="font-semibold">Description:</span>
                    <span
                        dangerouslySetInnerHTML={{ __html: overviewData.description }}
                    />
                </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">Loading overview data...</p>
            )}
        </div>
    );
};

export default Overview;

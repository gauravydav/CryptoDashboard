import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    assets: [],  // Array to store the available assets (e.g., 'bitcoin', 'ethereum', etc.)
    priceData: {},  // Object to store the live price data of assets
    cachedPriceData: {},  // Cache to store price data temporarily
    selectedAsset: 'bitcoin',  // Default selected asset (could be 'bitcoin' or any other)
    overviewData: {},  // New state to store the selected asset's overview data
    historicalData: {},  // New state for storing historical data of the selected asset
};

const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {
        setAssets: (state, action) => {
            state.assets = action.payload;  // Set the list of available assets
        },
        setPriceData: (state, action) => {
            const priceData = action.payload;
            for (const asset in priceData) {
                state.priceData[asset] = priceData[asset];  // Update live price data
                state.cachedPriceData[asset] = priceData[asset];  // Cache price data for fallback
            }
        },
        setSelectedAsset: (state, action) => {
            state.selectedAsset = action.payload;  // Set the selected asset
        },
        fallbackToCachedData: (state, action) => {
            const asset = action.payload;
            if (state.cachedPriceData[asset]) {
                state.priceData[asset] = state.cachedPriceData[asset];  // Fall back to cached data if available
            }
        },
        setOverviewData: (state, action) => {
            state.overviewData = action.payload;  // Set the overview data for the selected asset
        },
        setHistoricalData: (state, action) => {
            state.historicalData = action.payload;  // Set the historical data for the selected asset
        },
    },
});

export const {
    setAssets,
    setPriceData,
    setSelectedAsset,
    fallbackToCachedData,
    setOverviewData,
    setHistoricalData
} = cryptoSlice.actions;

export default cryptoSlice.reducer;

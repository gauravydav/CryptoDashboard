import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    assets: [],  // List of assets
    priceData: {},  // Price data by asset
    selectedAsset: 'bitcoin',  // Default selected asset
};

const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {
        setAssets: (state, action) => {
            state.assets = action.payload;  // Update assets
        },
        setPriceData: (state, action) => {
            const priceData = action.payload;
            // Update the price data for each asset in the state
            for (const asset in priceData) {
                state.priceData[asset] = priceData[asset];
            }
        },
        setSelectedAsset: (state, action) => {
            state.selectedAsset = action.payload;
        },
    },
});

export const { setAssets, setPriceData, setSelectedAsset } = cryptoSlice.actions;
export default cryptoSlice.reducer;

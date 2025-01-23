import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPriceChange24h = createAsyncThunk(
    'crypto/fetchPriceChange24h',
    async (asset) => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${asset}`);
            const data = response.data.market_data;
            return data.price_change_percentage_24h;  
        } catch (error) {
            console.error('Error fetching 24h price change:', error);
            return null;
        }
    }
);

export const fetchPriceData = createAsyncThunk(
    'crypto/fetchPriceData',
    async (asset) => {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${asset}`);
        return response.data.market_data;
    }
);

export const fetchHistoricalData = createAsyncThunk(
    'crypto/fetchHistoricalData',
    async (asset) => {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${asset}/market_chart`, {
            params: { vs_currency: 'usd', days: 7 },
        });

        return response.data.prices.map((priceEntry, index) => {
            const [timestamp, price] = priceEntry;
            const volume = response.data.total_volumes[index][1]; 
            return {
                time: new Date(timestamp).toLocaleDateString(),
                price,
                volume,
            };
        });
    }
);


export const fetchOverviewData = (selectedAsset) => async (dispatch) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${selectedAsset}`);
        const data = response.data;

        if (data && data.market_data) {
            const overview = {
                marketCap: data.market_data.market_cap.usd,
                totalSupply: data.market_data.total_supply,
                circulatingSupply: data.market_data.circulating_supply,
                allTimeHigh: data.market_data.ath.usd,
                rank: data.market_cap_rank,
                description: data.description.en,
            };

            console.log('Fetched Overview Data:', overview);
            dispatch(setOverviewData(overview));
        } else {
            console.log('No market data available for asset:', selectedAsset);
        }
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
    }
};

const initialState = {
    assets: ['bitcoin', 'ethereum', 'monero', 'litecoin'],  
    priceData: {},  
    selectedAsset: 'bitcoin',  
    overviewData: {}, 
    historicalData: {}, 
    priceChange24h: {},  
};

const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {
        setSelectedAsset: (state, action) => {
            state.selectedAsset = action.payload;
        },
        setPriceData: (state, action) => {
            state.priceData = { ...state.priceData, ...action.payload };  
            // console.log('State after setting price data:', state.priceData);
        },
        setOverviewData: (state, action) => {
            state.overviewData = action.payload;
            // console.log('State after setting overview data:', state.overviewData);
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPriceChange24h.fulfilled, (state, action) => {
            if (action.payload !== null) {
                state.priceChange24h[state.selectedAsset] = action.payload;
            } else {
                console.error('Error fetching 24h price change data.');
            }
        })
        .addCase(fetchHistoricalData.fulfilled, (state, action) => {
            state.historicalData[state.selectedAsset] = action.payload;
            // console.log('State after setting historical data:', state.historicalData);
        });
    },
});

export const {
    setPriceData, 
    setSelectedAsset,
    setOverviewData,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;

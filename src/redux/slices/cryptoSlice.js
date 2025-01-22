import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunk for fetching crypto data
export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchData',
  async () => {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin');
    const data = await response.json();
    return data;
  }
);

const initialState = {
  price: null,
  change: null,
  overview: {},
  history: [],
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCryptoData.fulfilled, (state, action) => {
      state.price = action.payload.market_data.current_price.usd;
      state.change = action.payload.market_data.price_change_percentage_24h;
      state.overview = {
        marketCap: action.payload.market_data.market_cap.usd,
        rank: action.payload.coins_rank,
        supply: action.payload.market_data.circulating_supply,
        description: action.payload.description.en,
      };
      state.history = action.payload.history;  // Assuming historical data exists in the API response
    });
  },
});

export default cryptoSlice.reducer;

import axios from 'axios';

export const fetchPriceData = (crypto) => async dispatch => {
  const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
  dispatch({ type: 'SET_PRICE_DATA', payload: response.data });
};

export const fetchHistoricalData = (crypto) => async dispatch => {
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=7`);
  dispatch({ type: 'SET_HISTORICAL_DATA', payload: response.data });
};

export const fetchOverviewData = (crypto) => async dispatch => {
  const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${crypto}`);
  dispatch({ type: 'SET_OVERVIEW_DATA', payload: response.data });
};

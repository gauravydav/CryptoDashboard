const initialState = {
    priceData: {
      currentPrice: 0,
      percentChange: 0,
      historicalData: { dates: [], prices: [] },
    },
    overviewData: {},
    historyData: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PRICE_DATA':
        return { ...state, priceData: action.payload };
      case 'SET_HISTORICAL_DATA':
        return { ...state, historyData: action.payload };
      case 'SET_OVERVIEW_DATA':
        return { ...state, overviewData: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  
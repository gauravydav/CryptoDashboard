import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoData } from '../redux/slices/cryptoSlice';
import ChartComponent from '../components/ChartComponent';

const Dashboard = () => {
  const dispatch = useDispatch();
  const cryptoData = useSelector(state => state.crypto);

  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-xl">Dashboard</h2>
      <div className="my-4">
        <p>Current Price: {cryptoData.price}</p>
        <p>24h Change: {cryptoData.change}</p>
      </div>
      <ChartComponent />
    </div>
  );
};

export default Dashboard;

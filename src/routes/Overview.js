import React from 'react';
import { useSelector } from 'react-redux';

const Overview = () => {
  const overviewData = useSelector(state => state.crypto.overview);

  return (
    <div className="p-4">
      <h2 className="text-xl">Overview</h2>
      <div className="my-4">
        <p>Market Cap: {overviewData.marketCap}</p>
        <p>Rank: {overviewData.rank}</p>
        <p>Circulating Supply: {overviewData.supply}</p>
        <p>Description: {overviewData.description}</p>
      </div>
    </div>
  );
};

export default Overview;

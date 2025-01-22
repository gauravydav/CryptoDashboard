import React from 'react';
import { useSelector } from 'react-redux';

const History = () => {
  const historyData = useSelector(state => state.crypto.history);

  return (
    <div className="p-4">
      <h2 className="text-xl">Historical Data</h2>
      <table className="min-w-full mt-4">
        <thead>
          <tr>
            <th>Date</th>
            <th>Price</th>
            <th>24h Volume</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((data, index) => (
            <tr key={index}>
              <td>{data.date}</td>
              <td>{data.price}</td>
              <td>{data.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;

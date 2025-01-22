// websocket.js (or wherever you handle the WebSocket)
import { setPriceData,setAssets } from '../redux/slices/cryptoSlice';

export const createPriceSocket = (assets, dispatch) => {
    // Corrected string interpolation with backticks
    const socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${assets.join(',')}`);

    socket.onopen = () => {
        socket.send(JSON.stringify({ type: 'subscribe', assets }));
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        dispatch(setPriceData(data));  // Dispatch price data to Redux
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };
};

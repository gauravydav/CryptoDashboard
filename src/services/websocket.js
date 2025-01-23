import { setPriceData } from '../redux/slices/cryptoSlice';  

export const createPriceSocket = (assets, dispatch) => {
    const socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${assets.join(',')}`);

    socket.onopen = () => {
        console.log('WebSocket connected');
        socket.send(JSON.stringify({ type: 'subscribe', assets }));
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data) {
            dispatch(setPriceData(data)); 
        }
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };
};

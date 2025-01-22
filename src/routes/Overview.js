import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAssets } from '../redux/slices/cryptoSlice';
import { Button, Typography } from '@mui/material';
import axios from 'axios';

const Overview = () => {
    const dispatch = useDispatch();
   

    return (
        <div>
            <Typography variant="h3" gutterBottom>
                Cryptocurrency Overview
            </Typography>
        </div>
    );
};

export default Overview;

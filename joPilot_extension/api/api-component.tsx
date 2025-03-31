import React, { useState } from 'react';
import axios from 'axios';
import api from './api-service'; // Ensure this path is correct
import { Button } from '@mui/material';

interface ApiComponentProps {
  endpoint: string;
}

const ApiComponent: React.FC<ApiComponentProps> = ({ endpoint }) => {
  const [data, setData] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const fetchAPI = async () => {
    console.log('fetchAPI called with endpoint:', endpoint);
    try {
      const response = await api.get(endpoint);
      console.log('Data fetched successfully:', response.data);
      setData(response.data.message || JSON.stringify(response.data));
    } catch (err) {
      console.log('Error occurred:', err);
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      <h1>API Data</h1>
      {error ? <p style={{ color: 'red' }}>Error: {error}</p> : <p>{data}</p>}
      <Button variant="contained" color="primary" onClick={fetchAPI}>
        Test API
      </Button>
    </div>
  );
};

export default ApiComponent;
//for axios api layer

import React, { useEffect, useState } from 'react';
import api from './api/api';
import axios from 'axios';

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
      setData(response.data.message);
    } catch (err) {
      console.log('Error occurred:', err);
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  useEffect(() => {
    console.log('useEffect called');
    fetchAPI();
  }, [endpoint]);

  return (
    <div>
      <h1>API Data</h1>
      {error ? <p>Error: {error}</p> : <p>{data}</p>}
    </div>
  );
};

export default ApiComponent;
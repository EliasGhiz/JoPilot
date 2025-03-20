// src/components/YourComponent.tsx
import React, { useEffect, useState } from 'react';
import api from '../api';
import axios from 'axios';

const ApiComponent: React.FC = () => {
    const [data, setData] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const fetchAPI = async () => {
        try 
        {
        const response = await api.get('/test'); //
        console.log('Data fetched successfully:', response.data); //console debugging
        setData(response.data.message);
        }
        catch (err)
        {
        if (axios.isAxiosError(err))
            {
                setError(err.message);
            }else
            {
                setError('An unexpected error occurred');
            }
        }
    };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div>
      <h1>API Data</h1>
      {error ? <p>Error: {error}</p> : <p>{data}</p>}
    </div>
  );
};

export default ApiComponent;
import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';


export default function BadClient() {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('http://localhost:3001/bad-client');
                setData(response.data);
            }catch (error) {
                console.error('Error fetching data:', error);
                alert('Failed to fetch data from server.');
            }
        }
    }, []);

  return (
    <div>
        
      
    </div>
  )
}

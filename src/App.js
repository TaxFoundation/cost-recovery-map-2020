import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { csvParse } from 'd3-dsv';
import USMap from './components/USMap';

const App = () => {
  const [data, setData] = useState(null);
  const [fullExpensing, setFullExpesing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/cost-recovery.csv');
      setData(csvParse(result.data));
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => setFullExpesing(false)}>
          Neutral Cost Recovery for Structures
        </button>
        <button onClick={() => setFullExpesing(true)}>
          NCRS + Full Expensing
        </button>
      </div>
      {data ? <USMap data={data} fullExpensing={fullExpensing} /> : null}
    </div>
  );
};

export default App;

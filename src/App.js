import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { csvParse } from 'd3-dsv';

import Button from './components/Button';
import USMap from './components/USMap';

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  margin: 0 auto;
  max-width: 600px;
`;

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
      <ButtonGroup>
        <Button
          selected={!fullExpensing}
          onClick={() => setFullExpesing(false)}
        >
          Neutral Cost Recovery for Structures
        </Button>
        <Button selected={fullExpensing} onClick={() => setFullExpesing(true)}>
          NCRS + Full Expensing
        </Button>
      </ButtonGroup>
      {data ? <USMap data={data} fullExpensing={fullExpensing} /> : null}
    </div>
  );
};

export default App;

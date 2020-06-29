import React from 'react';
import styled from 'styled-components';
import { colorize } from '../helpers';

const Grid = styled.div`
  display: flex;

  div {
    flex: 1;
    line-height: 16px;
    height: 16px;
  }
`;

const LegendContainer = styled.div`
  align-content: baseline;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: auto 1fr auto;
`;

export const Legend = ({ domain }) => {
  return (
    <div>
      <p style={{ textAlign: 'center' }}>Change in Private Capital Stock</p>
      <LegendContainer>
        <div>$0</div>
        <Grid>
          {Array.from({ length: 11 }, (v, i) => i).map((x, i) => (
            <div
              key={`legend-step-${i}`}
              style={{
                backgroundColor: colorize((i * domain[1]) / 10, domain),
              }}
            ></div>
          ))}
        </Grid>
        <div>${domain[1]}b</div>
      </LegendContainer>
    </div>
  );
};

export default Legend;

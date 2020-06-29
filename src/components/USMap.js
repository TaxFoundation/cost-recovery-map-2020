import React from 'react';
import styled from 'styled-components';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { format } from 'd3-format';
import { feature } from 'topojson-client';

import US from '../data/us.json';
import { colorize } from '../helpers';
import Tooltip from './Tooltip';
import Legend from './Legend';

const State = styled.path`
  cursor: pointer;
  stroke: #fff;
  stroke-width: 1;
  stroke-linejoin: bevel;
`;

const tooltipText = (fte, pcs, name, fullExpensing) => `
  <p style="margin: 0; text-align: center; font-weight: 700; border-bottom: 1px solid #eee; padding-bottom: 10px;">${name}</p>
  <table>
    <thead>
      <caption>Neutral Cost Recovery for Structures${
        fullExpensing ? ' with Full Expensing' : ''
      }</caption>
    </thead>
    <tbody>
      <tr>
        <td style="font-size: 14px;">FTE Jobs</td>
        <td style="font-size: 14px; text-align: right; padding-left: 10px;">
          ${format(',.0f')(fte)}
        </td>
      </tr>
      <tr>
        <td style="font-size: 14px;">Private Capital Stock</td>
        <td style="font-size: 14px; text-align: right; padding-left: 10px;">
          ${format('$,')(pcs)} billion
        </td>
      </tr>
    </tbody>
  </table>
`;

const MapSvg = ({ data, fullExpensing, domain }) => {
  const scale = 780;
  const xScale = 600;
  const yScale = 400;

  const path = geoPath().projection(
    geoAlbersUsa()
      .scale(scale)
      .translate([xScale / 2, yScale / 2 - 25])
  );

  const states = feature(US, US.objects.states).features.map(d => {
    let stateData = data.find(s => {
      return +s.fips === +d.id;
    });

    if (stateData) {
      const fte = fullExpensing
        ? stateData['fte_ncrs_fe']
        : stateData['fte_ncrs'];
      const pcs = fullExpensing
        ? stateData['pcs_ncrs_fe']
        : stateData['pcs_ncrs'];
      return (
        <State
          d={path(d)}
          key={`state-${d.id}`}
          fill={colorize(pcs, domain)}
          data-tip={
            stateData
              ? tooltipText(fte, pcs, stateData.name, fullExpensing)
              : null
          }
          data-for='usmap'
          data-html={true}
        />
      );
    }
    return <State d={path(d)} key={`state-${d.id}`} fill='#eee' />;
  });

  return (
    <svg width='100%' viewBox={`0 0 ${xScale} ${yScale}`}>
      {states}
    </svg>
  );
};

const USMap = ({ data, fullExpensing }) => {
  const domain = [0, Math.max(...data.map(d => d['pcs_ncrs']))];

  return (
    <div>
      <MapSvg data={data} fullExpensing={fullExpensing} domain={domain} />
      <Legend domain={domain} />
      <Tooltip id='usmap' aria-haspopup='true' />
    </div>
  );
};

export default USMap;

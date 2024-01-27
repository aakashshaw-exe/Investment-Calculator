// src/components/Graph.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const LineGraph = ({ data }) => {
  console.log('Received Data:', data);

  return (
    <div>
      <h2>Investment Growth</h2>
      <Line data={data?.labels ? data : { labels: [], datasets: [] }} />
    </div>
  );
};


export default LineGraph;

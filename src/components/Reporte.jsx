import React from 'react';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Stack, Box } from '@mui/material';

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function Reporte({ data, tipo }) {
  return (
    <Stack
      direction='row'
      justifyContent='center'>
      <Box
        sx={{
          width: 400,
          height: 400
        }}>
        {
          tipo == 1 && <Pie data={data} />
        }
        {
          tipo == 2 || tipo == 3 && <Bar data={data} />
        }
      </Box>
    </Stack>
  )
}
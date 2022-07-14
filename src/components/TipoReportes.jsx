import React from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';

export default function TipoReportes({ tipoReporte, setTipoReporte }) {
  const listaDeReportes = [
    { name: 'Test Positivos y Negativos', value: 1 },
    { name: 'Fallecidos y Hospitalizados', value: 2 },
    { name: 'Cantidad de Recuperados', value: 3 },
  ];

  const changeTipoReporte = (event) => {
    setTipoReporte(event.target.value);
  };

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby='tipoReporteLabel'
        name='listTipoReportes'
        value={tipoReporte}
        onChange={changeTipoReporte}>
        {
          listaDeReportes.map(item => {
            return (
              <FormControlLabel
                key={item.name}
                value={item.value}
                control={<Radio />}
                label={item.name} />
            )
          })
        }
      </RadioGroup>
    </FormControl>
  )
}
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { getEstados } from '../services/data';

export default function ListaEstados({ estado, setEstado, isMultiselect = false }) {
  const [estados, setEstados] = React.useState([]);

  React.useEffect(() => {
    const getEstadosByApi = async() => {
      const estadosByApi = await getEstados();
      setEstados(estadosByApi);
    }
    getEstadosByApi();
  }, []);

  const changeEstadoSelect = (event) => {
    if (isMultiselect) {
      if (typeof event.target.value === 'string') setEstado(event.target.value.split(','));
      else setEstado(event.target.value);
    } else {
      setEstado(event.target.value);
    }
  };

  return (
    <FormControl
      fullWidth>
      <InputLabel
        id='labelEstados'>
        Estados
      </InputLabel>
      <Select
        labelId='labelEstados'
        id='labelEstadosSelect'
        label='Estados'
        value={estado}
        onChange={changeEstadoSelect}
        multiple={isMultiselect}>
        {
          estados.map(({ name, state }) => {
            return (
              <MenuItem
                key={name}
                value={state}>
                { name }
              </MenuItem>
            )
          })
        }
      </Select>
    </FormControl>
  )
}
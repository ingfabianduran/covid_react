import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { getEstados } from '../services/data';

export default function ListaEstados() {
  const [estado, setEstado] = React.useState('');
  const [estados, setEstados] = React.useState([]);

  React.useEffect(() => {
    const getEstadosByApi = async() => {
      const estadosByApi = await getEstados();
      setEstados(estadosByApi);
    }
    getEstadosByApi();
  }, []);

  const changeEstadoSelect = (event) => {
    setEstado(event.target.value);
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
        onChange={changeEstadoSelect}>
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
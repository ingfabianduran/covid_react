import React from 'react';
import Estados from './components/ListaEstados';
import TipoReportes from './components/TipoReportes';
import Reporte from './components/Reporte';
import { Container, Stack, Button } from '@mui/material';

function App() {
  const [tipoReporte, setTipoReporte] = React.useState('');
  const [estado, setEstado] = React.useState('');
  const [dataReporte, setDataReporte] = React.useState(null);

  return (
    <Container
      maxWidth='lg'>
      <Stack
        direction='row'
        justifyContent='center'
        mt={2}
        mb={2}>
        <TipoReportes 
          tipoReporte={tipoReporte}
          setTipoReporte={setTipoReporte} />
      </Stack>  
      <Estados 
        estado={estado}
        setEstado={setEstado} />
      <Stack
        direction='row'
        justifyContent='center'
        mt={2}>
        <Button 
          variant='contained'
          size='large'>
          Generar
        </Button>
      </Stack>
      {
        dataReporte !== null && <Reporte data={data} />
      }      
    </Container>
  )
}

export default App

import React from 'react';
import Estados from './components/ListaEstados';
import TipoReportes from './components/TipoReportes';
import Reporte from './components/Reporte';
import { Container, Stack, Button } from '@mui/material';
import { getData } from './services/data';

function App() {
  const [tipoReporte, setTipoReporte] = React.useState('');
  const [estado, setEstado] = React.useState('');
  const [estadosSelect, setEstadosSelect] = React.useState([]);
  const [dataReporte, setDataReporte] = React.useState(null);
  const [isMultiselect, setIsMultiselect] = React.useState(false);

  React.useEffect(() => {
    if (tipoReporte == 3) setIsMultiselect(true);
  }, [tipoReporte]);

  const generarReporte = async() => {
    const estadoMinuscula = estado.toLocaleLowerCase();
    const data = await getData(estadoMinuscula);
    if (tipoReporte == 1) setDataReporte(reporteByTipoSelect('positiveTestsViral', 'negativeTestsViral', data));
    if (tipoReporte == 2) setDataReporte(reporteByTipoSelect('hospitalized', 'death', data));
  };

  const reporteByTipoSelect = (propiedadA, propiedadB, data) => {
    const dataChart = {
      labels: [propiedadA, propiedadB],
      datasets: [
        {
          label: 'Reporte 1',
          data: [data[propiedadA], data[propiedadB]],
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1
        }
      ]
    };
    return dataChart;
  };

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
        {
          !isMultiselect &&
            <Estados 
              estado={estado}
              setEstado={setEstado} />
        } 
        {
          isMultiselect &&
            <Estados 
              estado={estadosSelect}
              setEstado={setEstadosSelect}
              isMultiselect={isMultiselect} />
        }
      <Stack
        direction='row'
        justifyContent='center'
        mt={2}>
        <Button 
          variant='contained'
          size='large'
          onClick={generarReporte}>
          Generar
        </Button>
      </Stack>
      <Stack
        mt={2}>
        {
          dataReporte != null && <Reporte data={dataReporte} tipo={tipoReporte} />
        }
      </Stack>      
    </Container>
  )
}

export default App

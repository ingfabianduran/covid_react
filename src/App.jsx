import React from 'react';
import Estados from './components/ListaEstados';
import TipoReportes from './components/TipoReportes';
import Reporte from './components/Reporte';
import { Container, Stack, Button, Snackbar } from '@mui/material';
import { getData } from './services/data';

function App() {
  const [tipoReporte, setTipoReporte] = React.useState('');
  const [estado, setEstado] = React.useState('');
  const [estadosSelect, setEstadosSelect] = React.useState([]);
  const [dataReporte, setDataReporte] = React.useState(null);
  const [isMultiselect, setIsMultiselect] = React.useState(false);
  const [openMessage, setOpenMessage] = React.useState(false);
  const [textMessage, setTextMessage] = React.useState('');

  React.useEffect(() => {
    if (tipoReporte == 1 || tipoReporte == 2) setIsMultiselect(false);
    if (tipoReporte == 3) setIsMultiselect(true);
  }, [tipoReporte]);

  const generarReporte = async() => {
    const estadoMinuscula = estado.toLocaleLowerCase();
    const data = await getData(estadoMinuscula);
    
    if (tipoReporte == 1) setDataReporte(reporteByTipoSelect('positiveTestsViral', 'negativeTestsViral', data));
    if (tipoReporte == 2) setDataReporte(reporteByTipoSelect('hospitalized', 'death', data));
    if (tipoReporte == 3) {
      if (estadosSelect.length > 2 || estadosSelect.length == 0) {
        setOpenMessage(true);
        setTextMessage('Por favor seleccionar dos estados');
        setTimeout(() => {
          setOpenMessage(false);
        }, 5000);
      } else {
        let dataArray = [];
        for (let i = 0; i < estadosSelect.length; i ++) {
          const listEstadosSelect = estadosSelect[i].toLocaleLowerCase();
          const dataEstadoSelect = await getData(listEstadosSelect);
          dataArray.push(dataEstadoSelect);
        }
        setDataReporte(reporteByTipoSelect(dataArray[0].state, dataArray[1].state, dataArray, 'positive'));
        console.log(dataReporte);
      }
    }
  };

  const reporteByTipoSelect = (propiedadA, propiedadB, data, comparativa = '') => {
    if (Array.isArray(data)) {
      const labels = [comparativa];
      let dataChart = { labels, datasets: [] };
      for (let i = 0; i < data.length; i ++) {
        const generateColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        dataChart.datasets.push({
          label: data[i].state,
          data: [data[i][comparativa]],
          backgroundColor: generateColor
        });
      }
      return dataChart;
    }

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
      <Snackbar 
        open={openMessage}
        message={textMessage} />
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

import './App.css';
import FormularioDatosModificables from './componentes/FormularioDatosModificables';
import { ServicioSimulacion } from './servicio/inidex';
import VectorDeEstado from './componentes/VectorDeEstado';
import InformeResultados from './componentes/InformeResultados';

import { useState } from 'react';
function App() {
  const [resultados, setResultados] = useState({
    vectorEstado: [[]],
    ultimaFila: [],
    reporte: {},
  });

  function onSubmitData(data) {
    const resultados = ServicioSimulacion(data);
    setResultados(resultados);
    console.log(resultados);
  }

  return (
    <>
      <FormularioDatosModificables onSubmitData={onSubmitData} />

      <VectorDeEstado
        vectorEstado={resultados.vectorEstado}
        ultimaFila={resultados.ultimaFila}
      />
      <InformeResultados resultados={resultados.reporte} />
    </>
  );
}

export default App;

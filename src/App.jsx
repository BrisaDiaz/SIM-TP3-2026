//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
import './App.css';
import FormularioDatosModificables from './FormularioDatosModificables';
import { ServicioSimulacion } from './servicio/inidex';

function App() {
  function onSubmitData(data) {
    const resultados = ServicioSimulacion(data);
    console.log('Resultados:', resultados);
  }

  return <FormularioDatosModificables onSubmitData={onSubmitData} />;
}

export default App;

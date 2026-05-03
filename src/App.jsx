//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
import './App.css';
import FormularioDatosModificables from './FormularioDatosModificables';

function App() {
  function onSubmitData(data) {
    console.log('Datos enviados:', data);
  }

  return <FormularioDatosModificables onSubmitData={onSubmitData} />;
}

export default App;

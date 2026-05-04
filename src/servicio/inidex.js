import {
  GeneradorExponencial,
  GeneradorNormal,
  GeneradorUniforme,
  generarRND,
} from '../generadores';
import { formatearTiempo } from '../utils/index';

// const MOCK_DATOS = {
//   filasSimular: 100000,
//   filasMostrar: 200,
//   filaDesde: 0,
//   probCercano: 35,
//   probIntermedio: 40,
//   probLejano: 25,
//   aCercano: 1,
//   bCercano: 2,
//   aIntermedio: 2,
//   bIntermedio: 3,
//   aLejano: 3,
//   bLejano: 5,
//   aRecorrido: 30,
//   bRecorrido: 45,
//   probValidacion: 45,
//   mediaValidacion: 60,
//   desvValidacion: 20,
//   probBloqueo: 40,
//   porcAumentoDemora: 80,
//   probParadaExtra: 24,
//   mediaParadaExtra: 80,
// };

export function ServicioSimulacion(datos) {
  //Generadores
  const generadorUniformeCuadrasSectorCercano = new GeneradorUniforme(
    datos.aCercano,
    datos.bCercano,
  );
  const generadorUniformeCuadrasSectorIntermedio = new GeneradorUniforme(
    datos.aIntermedio,
    datos.bIntermedio,
  );
  const generadorUniformeCuadrasSectorLejano = new GeneradorUniforme(
    datos.aLejano,
    datos.bLejano,
  );
  const generadorUniformeRecorrido = new GeneradorUniforme(
    datos.aRecorrido,
    datos.bRecorrido,
  );
  const generadorNormalValidacion = new GeneradorNormal(
    datos.mediaValidacion,
    datos.desvValidacion,
  );
  const generadorExponencialParadaExtra = new GeneradorExponencial(
    1 / datos.mediaParadaExtra,
  );

  const generadores = {
    generadorUniformeCuadrasSectorCercano,
    generadorUniformeCuadrasSectorIntermedio,
    generadorUniformeCuadrasSectorLejano,
    generadorUniformeRecorrido,
    generadorNormalValidacion,
    generadorExponencialParadaExtra,
  };
  //Simulación
  const vectorEstado = [];

  let filaAnterior = [];
  let filaActual = [];

  filaAnterior[12] = 0;
  filaAnterior[13] = 0;

  for (let i = 0; i < datos.filasSimular; i++) {
    filaActual = procesarFila(filaAnterior, datos, generadores); // procesar fila actual a partir de fila anterior

    if (i >= datos.filaDesde - 1 && vectorEstado.length < datos.filasMostrar) {
      // guardar fila en vectorEstado
      vectorEstado.push(filaActual);
    }
    filaAnterior = [...filaActual]; // actualizar fila anterior
  }

  const reporte = generarReporte(filaAnterior);

  return {
    vectorEstado,
    reporte,
    ultimaFila: filaAnterior,
  };
}

function determinarSectorDestino(rnd, datos) {
  const rangoCercano = [0, datos.probCercano / 100 - 0.01];
  const rangoIntermedio = [
    datos.probCercano / 100,
    (datos.probCercano + datos.probIntermedio) / 100 - 0.01,
  ];

  if (rnd >= rangoCercano[0] && rnd <= rangoCercano[1]) {
    return 'Cercano';
  } else if (rnd >= rangoIntermedio[0] && rnd <= rangoIntermedio[1]) {
    return 'Intermedio';
  }
  return 'Lejano';
}

function determinarCuadrasAlDestino(sector, rnd, generadores) {
  switch (sector) {
    case 'Cercano':
      return generadores.generadorUniformeCuadrasSectorCercano.generar(rnd)[0];
    case 'Intermedio':
      return generadores.generadorUniformeCuadrasSectorIntermedio.generar(
        rnd,
      )[0];
    case 'Lejano':
      return generadores.generadorUniformeCuadrasSectorLejano.generar(rnd)[0];
    default:
      throw new Error('Sector desconocido');
  }
}

function derminarParadaValidacion(rnd, datos) {
  const rangoValidacion = [0, datos.probValidacion / 100 - 0.01];
  return rnd >= rangoValidacion[0] && rnd <= rangoValidacion[1];
}

function determinarBloqueoRuta(rnd, datos) {
  const rangoBloqueo = [0, datos.probBloqueo / 100 - 0.01];
  return rnd >= rangoBloqueo[0] && rnd <= rangoBloqueo[1];
}

function determinarParadaExtra(rnd, datos) {
  const rangoParadaExtra = [0, datos.probParadaExtra / 100 - 0.01];
  return rnd >= rangoParadaExtra[0] && rnd <= rangoParadaExtra[1];
}

function determinarDemoraValidacion(rnd1, rnd2, generadores) {
  return generadores.generadorNormalValidacion.generar(rnd1, rnd2);
}

function determinarDemoraBloqueo(datos, demoraBase) {
  return (demoraBase * datos.porcAumentoDemora) / 100;
}
function determinarDemoraParadaExtra(rnd, generadores) {
  return generadores.generadorExponencialParadaExtra.generar(rnd)[0];
}

function procesarFila(filaAnterior, datos, generadores) {
  const filaActual = []; // copiar fila anterior

  filaActual[0] = (filaAnterior[0] || 0) + 1; // Vehículo
  const rndSector = generarRND();
  filaActual[1] = rndSector; // RND1
  const sectorDestino = determinarSectorDestino(rndSector, datos);
  filaActual[2] = sectorDestino; // Sector
  const rndCuadras = generarRND(); // RND 2
  const cuadrasAlDestino = Number(
    determinarCuadrasAlDestino(sectorDestino, rndCuadras, generadores).toFixed(
      0,
    ),
  );
  filaActual[3] = rndCuadras; // RND 2
  filaActual[4] = cuadrasAlDestino; // Cuadras
  const rndRecorrido = generarRND(); // RND 3
  filaActual[5] = rndRecorrido; // RND 3
  const tiempoXCuadra =
    generadores.generadorUniformeRecorrido.generar(rndRecorrido)[0];
  filaActual[6] = tiempoXCuadra; // Tiempo por cuadra
  const demoraBase = tiempoXCuadra * cuadrasAlDestino;
  filaActual[7] = demoraBase; // Demora base
  const rndValidacion = generarRND(); // RND 4
  filaActual[8] = rndValidacion; //RND 4
  const paradaValidacion = derminarParadaValidacion(rndValidacion, datos);
  filaActual[9] = paradaValidacion ? 'Sí' : 'No';

  // Actualizar las demoras de validación disponibles
  filaActual[10] = '-'; // RND 5
  filaActual[11] = '-'; // RND 6
  if (filaAnterior[9] === 'Sí') {
    // Si hubo validación en la fila anterior y se generaron demoras, se utilzó la demora de validación 1 (filaAnterior[12])

    if (filaAnterior[12] !== 0 && filaAnterior[13] !== 0) {
      filaActual[12] = 0;
      filaActual[13] = filaAnterior[13]; // Demora validación 2 se mantiene
    } else {
      // Si no se generaron demoras en la fila anterior, se utilizo un demora de validación 2 y ambas quedan en cero
      filaActual[12] = 0;
      filaActual[13] = 0;
    }
  } else {
    filaActual[12] = filaAnterior[12] || 0; // Si no hubo validación en la fila anterior, se mantiene la demora de validación 1 si existía
    filaActual[13] = filaAnterior[13] || 0; // Si no hubo validación en la fila anterior, se mantiene la demora de validación 2 si existía
  }

  if (filaActual[9] === 'Sí') {
    // Si se tiene una demora de validación y no hay una demora remanente (Demora de validación 2) en la fila anterior, se generan las demoras de validación 1 y 2
    if (filaActual[13] === 0) {
      // generar las demoras
      const rnd1DemoraValidacion = generarRND(); // RND 5
      const rnd2DemoraValidacion = generarRND(); // RND 6
      filaActual[10] = rnd1DemoraValidacion; // RND 5
      filaActual[11] = rnd2DemoraValidacion; // RND 6
      const arrayDemorasValidacion = determinarDemoraValidacion(
        rnd1DemoraValidacion,
        rnd2DemoraValidacion,
        generadores,
      );
      filaActual[12] = arrayDemorasValidacion[0]; // Demora validación 1
      filaActual[13] = arrayDemorasValidacion[1]; // Demora validación 2
    }
  }

  let bloqueoRuta = false;

  if (['Cercano', 'Lejano'].includes(sectorDestino)) {
    const rndBloqueo = generarRND();
    filaActual[14] = rndBloqueo; // RND 7
    bloqueoRuta = determinarBloqueoRuta(rndBloqueo, datos);
    filaActual[15] = bloqueoRuta ? 'Sí' : 'No'; // ¿Ruta bloqueada?
    if (bloqueoRuta) {
      const incrementoDemora = determinarDemoraBloqueo(datos, tiempoXCuadra);
      filaActual[16] = incrementoDemora; // Incremento
    } else {
      filaActual[16] = 0; // Sin incremento de demora
    }
  } else {
    filaActual[14] = '-'; // RND 7 vacío para sector intermedio
    filaActual[15] = '-'; // ¿Ruta Bloqueada? vacía para sector intermedio
    filaActual[16] = 0; // Incremento nulo para sector intermedio
  }

  const rndParadaExtra = generarRND(); // RND 8
  filaActual[17] = rndParadaExtra; // RND 8
  const paradaExtra = determinarParadaExtra(rndParadaExtra, datos);
  filaActual[18] = paradaExtra ? 'Sí' : 'No'; // ¿Hace Parada Extra?
  if (paradaExtra) {
    const rndDemoraParadaExtra = generarRND(); // RND 9
    filaActual[19] = rndDemoraParadaExtra; // RND 9
    const demoraParadaExtra = determinarDemoraParadaExtra(
      rndDemoraParadaExtra,
      generadores,
    );
    filaActual[20] = demoraParadaExtra; // Demora por parada extra
  } else {
    filaActual[19] = '-'; // RND 9 vacío si no hace parada extra
    filaActual[20] = 0; // Sin demora por parada extra
  }

  let tiempoTotal = 0;

  if (filaActual[9] === 'Sí') {
    if (filaActual[12] !== 0) {
      tiempoTotal =
        demoraBase + filaActual[12] + filaActual[16] + filaActual[20];
    } else {
      tiempoTotal =
        demoraBase + filaActual[13] + filaActual[16] + filaActual[20];
    }
  } else {
    tiempoTotal = demoraBase + filaActual[16] + filaActual[20];
  }

  filaActual[21] = tiempoTotal; // Tiempo total

  //Acumuladores
  const tiempoTotalAcumulado = filaAnterior[22]
    ? filaAnterior[22] + filaActual[21]
    : filaActual[21];
  filaActual[22] = tiempoTotalAcumulado; // Tiempo++

  const contadorDetencionesDobles =
    (filaAnterior[23] || 0) + (paradaValidacion && paradaExtra ? 1 : 0);
  filaActual[23] = contadorDetencionesDobles; // Detenciones dobles++

  const maxTiempo = filaAnterior[24]
    ? Math.max(filaAnterior[24], filaActual[21])
    : filaActual[21];
  filaActual[24] = maxTiempo; // Max Tiempo

  const minTiempo = filaAnterior[25]
    ? Math.min(filaAnterior[25], filaActual[21])
    : filaActual[21];
  filaActual[25] = minTiempo; // Min Tiempo

  const contadorVehiculosDemorados = filaAnterior[26]
    ? (paradaValidacion || paradaExtra || bloqueoRuta ? 1 : 0) +
      filaAnterior[26]
    : paradaValidacion || paradaExtra || bloqueoRuta
      ? 1
      : 0;
  filaActual[26] = contadorVehiculosDemorados; // Vehículos demorados++

  const contadorVehiculosCercano = filaAnterior[27]
    ? filaAnterior[27] + (sectorDestino === 'Cercano' ? 1 : 0)
    : sectorDestino === 'Cercano'
      ? 1
      : 0;
  filaActual[27] = contadorVehiculosCercano; // Contador Vehículos Cercano

  const contadorVehiculosIntermedio = filaAnterior[28]
    ? filaAnterior[28] + (sectorDestino === 'Intermedio' ? 1 : 0)
    : sectorDestino === 'Intermedio'
      ? 1
      : 0;
  filaActual[28] = contadorVehiculosIntermedio; // Contador Vehículos Intermedio

  const contadorVehiculosLejanos = filaAnterior[29]
    ? filaAnterior[29] + (sectorDestino === 'Lejano' ? 1 : 0)
    : sectorDestino === 'Lejano'
      ? 1
      : 0;
  filaActual[29] = contadorVehiculosLejanos; // Contador Vehículos Lejano

  const acumuladorVehiculosCercano = filaAnterior[30]
    ? filaAnterior[30] + (sectorDestino === 'Cercano' ? filaActual[21] : 0)
    : sectorDestino === 'Cercano'
      ? filaActual[21]
      : 0;
  filaActual[30] = acumuladorVehiculosCercano; // Tiempo Acumulado Vehículos Cercano

  const acumuladorVehiculosIntermedio = filaAnterior[31]
    ? filaAnterior[31] + (sectorDestino === 'Intermedio' ? filaActual[21] : 0)
    : sectorDestino === 'Intermedio'
      ? filaActual[21]
      : 0;
  filaActual[31] = acumuladorVehiculosIntermedio; // Tiempo Acumulado Vehículos Intermedio

  const acumuladorVehiculosLejanos = filaAnterior[32]
    ? filaAnterior[32] + (sectorDestino === 'Lejano' ? filaActual[21] : 0)
    : sectorDestino === 'Lejano'
      ? filaActual[21]
      : 0;
  filaActual[32] = acumuladorVehiculosLejanos; // Tiempo Acumulado Vehículos Lejano

  let demoraMaxValidacion = 0;

  if (filaActual[9] === 'Sí') {
    if (filaActual[12] !== 0) {
      demoraMaxValidacion = Math.max(filaAnterior[33] || 0, filaActual[12]);
    } else {
      demoraMaxValidacion = Math.max(filaAnterior[33] || 0, filaActual[13]);
    }
  } else {
    demoraMaxValidacion = filaAnterior[33] || 0; // Si no hubo validación, se mantiene la demora máxima de validación si existía
  }

  filaActual[33] = demoraMaxValidacion; // Demora Máxima en Validación

  const demoraMaxBloqueo = filaAnterior[34]
    ? Math.max(filaAnterior[34], filaActual[16])
    : filaActual[16];
  filaActual[34] = demoraMaxBloqueo; // Demora Máxima por Bloqueo

  const demoraMaxParadaExtra = filaAnterior[35]
    ? Math.max(filaAnterior[35], filaActual[20])
    : filaActual[20];
  filaActual[35] = demoraMaxParadaExtra; // Demora Máxima por Parada Extra

  return filaActual;
}

function generarReporte(ultimaFila) {
  const N = ultimaFila[0] + 1; // indice + 1

  const resultados = {
    punto1: formatearTiempo(ultimaFila[22] / N), // Tiempo promedio desde el ingreso del vehículo hasta su estacionamiento
    punto2: `${Number(((ultimaFila[23] / N) * 100).toFixed(2))}%`, // Porcentaje de vehículos que tuvieron detenciones dobles (parada en validación y parada extra)
    punto3: N - ultimaFila[23], // Cantidad de vehículos que no tuvieron detenciones dobles
    punto4: formatearTiempo(ultimaFila[24]), // Tiempo máximo registrado desde el ingreso del vehículo hasta su estacionamiento
    punto5: formatearTiempo(ultimaFila[25]), // Tiempo mínimo registrado desde el ingreso del vehículo hasta su estacionamiento
    punto6: ultimaFila[26], // Cantidad de vehículos que tuvieron alguna demora (parada en validación, parada extra o bloqueo de ruta)
    punto7A: formatearTiempo(ultimaFila[30] / ultimaFila[27]), // Tiempo promedio desde el ingreso del vehículo hasta su estacionamiento para vehículos con destino cercano
    punto7B: formatearTiempo(ultimaFila[31] / ultimaFila[28]), // Tiempo promedio desde el ingreso del vehículo hasta su estacionamiento para vehículos con destino intermedio
    punto7C: formatearTiempo(ultimaFila[32] / ultimaFila[29]), // Tiempo promedio desde el ingreso del vehículo hasta su estacionamiento para vehículos con destino lejano
    punto8A: formatearTiempo(ultimaFila[33]), // Demora máxima en validación
    punto8B: formatearTiempo(ultimaFila[34]), // Demora máxima por bloqueo
    punto8C: formatearTiempo(ultimaFila[35]), // Demora máxima por parada extra
  };

  return resultados;
}
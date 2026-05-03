import styles from './InformeResultados.module.css';

function InformeResultados({ resultados }) {
  if (!resultados || Object.keys(resultados).length === 0) {
    return (
      <div className={styles['informe-vacio']}>
        <p>No hay resultados para mostrar. Ejecute una simulación primero.</p>
      </div>
    );
  }

  return (
    <div className={styles['informe-container']}>
      <h2 className={styles['titulo']}>Informe de Simulación</h2>

      {/* Resumen General */}
      <div className={styles['seccion']}>
        <h3 className={styles['subtitulo']}>📊 Resumen General</h3>
        <div className={styles['grid-resumen']}>
          <div className={styles['tarjeta']}>
            <div className={styles['tarjeta-icono']}>⏱️</div>
            <div className={styles['tarjeta-contenido']}>
              <div className={styles['tarjeta-valor']}>{resultados.punto1}</div>
              <div className={styles['tarjeta-etiqueta']}>Tiempo Promedio</div>
              <div className={styles['tarjeta-descripcion']}>
                Tiempo desde ingreso hasta estacionamiento
              </div>
            </div>
          </div>

          <div className={styles['tarjeta']}>
            <div className={styles['tarjeta-icono']}>📈</div>
            <div className={styles['tarjeta-contenido']}>
              <div className={styles['tarjeta-valor']}>{resultados.punto2}</div>
              <div className={styles['tarjeta-etiqueta']}>
                Detenciones Dobles
              </div>
              <div className={styles['tarjeta-descripcion']}>
                Porcentaje de vehículos con parada en validación + parada extra
              </div>
            </div>
          </div>

          <div className={styles['tarjeta']}>
            <div className={styles['tarjeta-icono']}>🚗</div>
            <div className={styles['tarjeta-contenido']}>
              <div className={styles['tarjeta-valor']}>{resultados.punto3}</div>
              <div className={styles['tarjeta-etiqueta']}>
                Sin Detenciones Dobles
              </div>
              <div className={styles['tarjeta-descripcion']}>
                Vehículos que no tuvieron detenciones dobles
              </div>
            </div>
          </div>

          <div className={styles['tarjeta']}>
            <div className={styles['tarjeta-icono']}>⚠️</div>
            <div className={styles['tarjeta-contenido']}>
              <div className={styles['tarjeta-valor']}>{resultados.punto6}</div>
              <div className={styles['tarjeta-etiqueta']}>
                Vehículos con Demoras
              </div>
              <div className={styles['tarjeta-descripcion']}>
                Vehículos que tuvieron alguna demora (validación, extra o
                bloqueo)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tiempos Extremos */}
      <div className={styles['seccion']}>
        <h3 className={styles['subtitulo']}>⏰ Tiempos Extremos</h3>
        <div className={styles['grid-tiempos']}>
          <div className={styles['tarjeta-tiempo-max']}>
            <div className={styles['icono-extremo']}>🔴</div>
            <div>
              <div className={styles['etiqueta-extremo']}>Tiempo Máximo</div>
              <div className={styles['valor-extremo']}>{resultados.punto4}</div>
            </div>
          </div>
          <div className={styles['tarjeta-tiempo-min']}>
            <div className={styles['icono-extremo']}>🟢</div>
            <div>
              <div className={styles['etiqueta-extremo']}>Tiempo Mínimo</div>
              <div className={styles['valor-extremo']}>{resultados.punto5}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tiempos por Sector */}
      <div className={styles['seccion']}>
        <h3 className={styles['subtitulo']}>
          📍 Tiempos por Sector de Estacionamiento
        </h3>
        <div className={styles['grid-sector']}>
          <div className={styles['sector-cercano']}>
            <div className={styles['sector-titulo']}>Cercano</div>
            <div className={styles['sector-tiempo']}>{resultados.punto7A}</div>
            <div className={styles['sector-descripcion']}>
              Tiempo promedio para sector cercano
            </div>
          </div>
          <div className={styles['sector-intermedio']}>
            <div className={styles['sector-titulo']}>Intermedio</div>
            <div className={styles['sector-tiempo']}>{resultados.punto7B}</div>
            <div className={styles['sector-descripcion']}>
              Tiempo promedio para sector intermedio
            </div>
          </div>
          <div className={styles['sector-lejano']}>
            <div className={styles['sector-titulo']}>Lejano</div>
            <div className={styles['sector-tiempo']}>{resultados.punto7C}</div>
            <div className={styles['sector-descripcion']}>
              Tiempo promedio para sector lejano
            </div>
          </div>
        </div>
      </div>

      {/* Demoras Máximas */}
      <div className={styles['seccion']}>
        <h3 className={styles['subtitulo']}>🚦 Demoras Máximas por Tipo</h3>
        <div className={styles['grid-demoras']}>
          <div className={styles['demora-validacion']}>
            <div className={styles['demora-titulo']}>Validación</div>
            <div className={styles['demora-valor']}>{resultados.punto8A}</div>
            <div className={styles['demora-icono']}>🛑</div>
          </div>
          <div className={styles['demora-bloqueo']}>
            <div className={styles['demora-titulo']}>Bloqueo de Ruta</div>
            <div className={styles['demora-valor']}>{resultados.punto8B}</div>
            <div className={styles['demora-icono']}>🚧</div>
          </div>
          <div className={styles['demora-parada']}>
            <div className={styles['demora-titulo']}>Parada Extra</div>
            <div className={styles['demora-valor']}>{resultados.punto8C}</div>
            <div className={styles['demora-icono']}>⏸️</div>
          </div>
        </div>
      </div>

   
    </div>
  );
}

export default InformeResultados;

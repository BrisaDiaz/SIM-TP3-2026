//import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form';
import styles from './FormularioDatosModificables.module.css';

const FormularioDatosModificables = ({ onSubmitData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      filasSimular: 100000,
      filasMostrar: 200,
      filaDesde: 1,
      probCercano: 35,
      probIntermedio: 40,
      probLejano: 25,
      aCercano: 1,
      bCercano: 2,
      aIntermedio: 2,
      bIntermedio: 3,
      aLejano: 3,
      bLejano: 5,
      aRecorrido: 30,
      bRecorrido: 45,
      probValidacion: 45,
      mediaValidacion: 60,
      desvValidacion: 20,
      probBloqueo: 40,
      porcAumentoDemora: 80,
      probParadaExtra: 24,
      mediaParadaExtra: 80,
    },
  });

  const onSubmit = async (data) => {
    try {
      onSubmitData(data);
    } catch (error) {
      console.error(
        'Error al cargar los párametros:',
        error.response?.data || error.message,
      );
      alert(error.response?.data?.error || 'Error al guardar función');
    }
  };

  return (
    <section className={styles.formContainer}>
      <div className={styles.header}>
        <h2>TP Simulación Parqueando G19</h2>
        <p>Configuración de Parámetros de la Simulación</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.gridCards}>
          
          {/* Configuración General */}
          <div className={`${styles.sectionCard} ${styles.fullWidth}`}>
            <h3 className={styles.sectionTitle}>⚙️ Configuración General</h3>
            <div className={styles.inputGrid + ' ' + styles.threeColumns}>
              <div className={styles.inputGroup}>
                <label>Cantidad a simular:</label>
                <input type="number" {...register('filasSimular', { required: true })} min={1} />
                {errors.filasSimular && <span className={styles.errorText}>Campo obligatorio</span>}
              </div>
              <div className={styles.inputGroup}>
                <label>Cantidad a mostrar:</label>
                <input type="number" {...register('filasMostrar', { required: true })} min={1} />
                {errors.filasMostrar && <span className={styles.errorText}>Campo obligatorio</span>}
              </div>
              <div className={styles.inputGroup}>
                <label>Mostrar desde:</label>
                <input type="number" {...register('filaDesde', { required: true })} min={1} />
                {errors.filaDesde && <span className={styles.errorText}>Campo obligatorio</span>}
              </div>
            </div>
          </div>

          {/* Sector Cercano */}
          <div className={styles.sectionCard}>
            <h3 className={styles.sectionTitle}>📍 Sector Cercano</h3>
            <div className={styles.inputGrid}>
              <div className={styles.inputGroup + ' ' + styles.fullWidth} style={{gridColumn: '1 / -1'}}>
                <label>Probabilidad (%):</label>
                <input type="number" step="any" {...register('probCercano', { required: true })} max={100} />
                {errors.probCercano && <span className={styles.errorText}>Obligatorio</span>}
              </div>
              <div className={styles.inputGroup}>
                <label>Mínimo (A):</label>
                <input type="number" step="any" {...register('aCercano', { required: true })} min={0} />
                {errors.aCercano && <span className={styles.errorText}>Obligatorio</span>}
              </div>
              <div className={styles.inputGroup}>
                <label>Máximo (B):</label>
                <input type="number" step="any" {...register('bCercano', { required: true })} min={0}/>
                {errors.bCercano && <span className={styles.errorText}>Obligatorio</span>}
              </div>
            </div>
          </div>

          {/* Sector Intermedio */}
          <div className={styles.sectionCard}>
            <h3 className={styles.sectionTitle}>📍 Sector Intermedio</h3>
            <div className={styles.inputGrid}>
              <div className={styles.inputGroup + ' ' + styles.fullWidth} style={{gridColumn: '1 / -1'}}>
                <label>Probabilidad (%):</label>
                <input type="number" step="any" {...register('probIntermedio', { required: true })} max={100} min={0}/>
                {errors.probIntermedio && <span className={styles.errorText}>Obligatorio</span>}
              </div>
              <div className={styles.inputGroup}>
                <label>Mínimo (A):</label>
                <input type="number" step="any" {...register('aIntermedio', { required: true })} min={0}/>
                {errors.aIntermedio && <span className={styles.errorText}>Obligatorio</span>}
              </div>
              <div className={styles.inputGroup}>
                <label>Máximo (B):</label>
                <input type="number" step="any" {...register('bIntermedio', { required: true })} min={0}/>
                {errors.bIntermedio && <span className={styles.errorText}>Obligatorio</span>}
              </div>
            </div>
          </div>

          {/* Sector Lejano */}
          <div className={styles.sectionCard}>
            <h3 className={styles.sectionTitle}>📍 Sector Lejano</h3>
            <div className={styles.inputGrid}>
              <div className={styles.inputGroup + ' ' + styles.fullWidth} style={{gridColumn: '1 / -1'}}>
                <label>Probabilidad (%):</label>
                <input type="number" step="any" {...register('probLejano', { required: true })} max={100} min={0}/>
                {errors.probLejano && <span className={styles.errorText}>Obligatorio</span>}
              </div>
              <div className={styles.inputGroup}>
                <label>Mínimo (A):</label>
                <input type="number" step="any" {...register('aLejano', { required: true })} min={0}/>
                {errors.aLejano && <span className={styles.errorText}>Obligatorio</span>}
              </div>
              <div className={styles.inputGroup}>
                <label>Máximo (B):</label>
                <input type="number" step="any" {...register('bLejano', { required: true })} min={0}/>
                {errors.bLejano && <span className={styles.errorText}>Obligatorio</span>}
              </div>
            </div>
          </div>

          {/* Recorrido */}
          <div className={styles.sectionCard}>
            <h3 className={styles.sectionTitle}>🚗 Recorrido (Tiempo/Cuadra)</h3>
            <div className={styles.inputGrid}>
              <div className={styles.inputGroup}>
                <label>Mínimo (A):</label>
                <input type="number" step="any" {...register('aRecorrido', { required: true })} min={0}/>
                {errors.aRecorrido && <span className={styles.errorText}>Obligatorio</span>}
              </div>
              <div className={styles.inputGroup}>
                <label>Máximo (B):</label>
                <input type="number" step="any" {...register('bRecorrido', { required: true })} min={0}/>
                {errors.bRecorrido && <span className={styles.errorText}>Obligatorio</span>}
              </div>
            </div>
          </div>

          {/* Parada de Validación */}
          <div className={styles.sectionCard}>
            <h3 className={styles.sectionTitle}>🛑 Parada de Validación</h3>
            <div className={styles.inputGrid}>
              <div className={styles.inputGroup + ' ' + styles.fullWidth} style={{gridColumn: '1 / -1'}}>
                <label>Probabilidad de frenar (%):</label>
                <input type="number" step="any" {...register('probValidacion', { required: true })} max={100} min={0}/>
                {errors.probValidacion && <span className={styles.errorText}>Obligatorio</span>}
              </div>
              <div className={styles.inputGroup}>
                <label>Media:</label>
                <input type="number" step="any" {...register('mediaValidacion', { required: true })} min={0} />
                {errors.mediaValidacion && <span className={styles.errorText}>Obligatorio</span>}
              </div>
              <div className={styles.inputGroup}>
                <label>Desv. Estándar:</label>
                <input type="number" step="any" {...register('desvValidacion', { required: true })} min={0} />
                {errors.desvValidacion && <span className={styles.errorText}>Obligatorio</span>}
              </div>
            </div>
          </div>

          {/* Bloqueo de Ruta */}
          <div className={styles.sectionCard}>
            <h3 className={styles.sectionTitle}>🚧 Bloqueo de Ruta</h3>
            <div className={styles.inputGrid}>
              <div className={styles.inputGroup}>
                <label>Probabilidad (%):</label>
                <input type="number" step="any" {...register('probBloqueo', { required: true })} max={100} min={0} />
                {errors.probBloqueo && <span className={styles.errorText}>Obligatorio</span>}
              </div>
              <div className={styles.inputGroup}>
                <label>Aumento Demora (%):</label>
                <input type="number" step="any" {...register('porcAumentoDemora', { required: true })} min={0} />
                {errors.porcAumentoDemora && <span className={styles.errorText}>Obligatorio</span>}
              </div>
            </div>
          </div>

          {/* Parada Extra */}
          <div className={styles.sectionCard}>
            <h3 className={styles.sectionTitle}>⏸️ Parada Extra</h3>
            <div className={styles.inputGrid}>
              <div className={styles.inputGroup}>
                <label>Probabilidad (%):</label>
                <input type="number" step="any" {...register('probParadaExtra', { required: true })} max={100} min={0} />
                {errors.probParadaExtra && <span className={styles.errorText}>Obligatorio</span>}
              </div>
              <div className={styles.inputGroup}>
                <label>Media:</label>
                <input type="number" step="any" {...register('mediaParadaExtra', { required: true })} min={0} />
                {errors.mediaParadaExtra && <span className={styles.errorText}>Obligatorio</span>}
              </div>
              <div className={styles.inputGroup}>
                <label>Desv. Estándar:</label>
                <input type="number" step="any" {...register('desvParadaExtra', { required: true })} min={0} />
                {errors.desvParadaExtra && <span className={styles.errorText}>Obligatorio</span>}
              </div>
            </div>
          </div>

        </div>

        <div className={styles.submitContainer}>
          <button type="submit" className={styles.submitBtn}>
            Ejecutar Simulación
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormularioDatosModificables;

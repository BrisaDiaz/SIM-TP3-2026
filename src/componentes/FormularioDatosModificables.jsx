//import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form';
//import {useNavigate, useParams, useLocation} from "react-router-dom"

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
    <section className='container mt-5'>
      <h3 className='mb-4'>TP Simulación Parqueando</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='row g-3'
      >
        <div className='col-md-6'>
          <label>Cantidad de filas a simular:</label>
          <input
            {...register('filasSimular', { required: true })}
            className='form-control'
          />
          {errors.filasSimular && (
            <span className='text-danger'>Campo obligatorio</span>
          )}
        </div>

        <div className='col-md-6'>
          <label>Cantidad de filas a mostrar:</label>
          <input
            {...register('filasMostrar', { required: true })}
            className='form-control'
          />
          {errors.filasMostrar && (
            <span className='text-danger'>Campo obligatorio</span>
          )}
        </div>

        <div className='col-md-6'>
          <label>Mostrar desde la fila :</label>
          <input
            {...register('filaDesde', { required: true })}
            className='form-control'
          />
          {errors.filaDesde && (
            <span className='text-danger'>Campo obligatorio</span>
          )}
        </div>

        <h3 className='mb-4 mt-4'>Sector Cercano </h3>
        <div className='col-md-6'>
          <label>Porcentaje:</label>
          <input
            {...register('probCercano', { required: true })}
            className='form-control'
          />
          {errors.probCercano && (
            <span className='text-danger'>Campo obligatorio</span>
          )}
        </div>
        <div className='col-md-6'>
          <label>A:</label>
          <input
            {...register('aCercano', { required: true })}
            className='form-control'
          />
          {errors.aCercano && (
            <span className='text-danger'>Campo obligatorio</span>
          )}
        </div>
        <div className='col-md-6'>
          <label>B:</label>
          <input
            {...register('bCercano', { required: true })}
            className='form-control'
          />
          {errors.bCercano && (
            <span className='text-danger'>Campo obligatorio</span>
          )}
        </div>

        <h3 className='mb-4 mt-4'>Sector Intermedio </h3>
        <div className='col-md-6'>
          <label>Porcentaje:</label>
          <input
            {...register('probIntermedio', { required: true })}
            className='form-control'
          />
          {errors.probIntermedio && (
            <span className='text-danger'>Campo obligatorio</span>
          )}
        </div>
        <div className='col-md-6'>
          <label>A:</label>
          <input
            {...register('aIntermedio', { required: true })}
            className='form-control'
          />
          {errors.aIntermedio && (
            <span className='text-danger'>Campo obligatorio</span>
          )}
        </div>
        <div className='col-md-6'>
          <label>B:</label>
          <input
            {...register('bIntermedio', { required: true })}
            className='form-control'
          />
          {errors.bIntermedio && (
            <span className='text-danger'>Campo obligatorio</span>
          )}
        </div>

        <h3 className='mb-4 mt-4'>Sector Lejano </h3>
        <div className='col-md-6'>
          <label>Porcentaje:</label>
          <input
            {...register('probLejano', { required: true })}
            className='form-control'
          />
          {errors.probLejano && (
            <span className='text-danger'>Campo obligatorio</span>
          )}
        </div>
        <div className='col-md-6'>
          <label>A:</label>
          <input
            {...register('aLejano', { required: true })}
            className='form-control'
          />
          {errors.aLejano && (
            <span className='text-danger'>Campo obligatorio</span>
          )}
        </div>
        <div className='col-md-6'>
          <label>B:</label>
          <input
            {...register('bLejano', { required: true })}
            className='form-control'
          />
          {errors.bLejano && (
            <span className='text-danger'>Campo obligatorio</span>
          )}
        </div>

        <h3 className='mb-4 mt-4'>Párametros para el recorrido </h3>
        <div className='col-md-6'>
          <label>A:</label>
          <input
            {...register('aRecorrido', { required: true })}
            className='form-control'
          />
          {errors.aRecorrido && (
            <span className='text-danger'>Campo obligatorio</span>
          )}
        </div>
        <div className='col-md-6'>
          <label>B:</label>
          <input
            {...register('bRecorrido', { required: true })}
            className='form-control'
          />
          {errors.bRecorrido && (
            <span className='text-danger'>Campo obligatorio</span>
          )}
        </div>

        <h3 className='mb-4 mt-4'>Parada de validación </h3>
        <div className='col-md-6'>
          <label>Porcentaje de que frente:</label>
          <input
            {...register('probValidacion', { required: true })}
            className='form-control'
          />
          {errors.probValidacion && (
            <span className='text-danger'>Campo obligatorio</span>
          )}
        </div>
        <div className='col-md-6'>
          <label>Media:</label>
          <input
            {...register('mediaValidacion', { required: true })}
            className='form-control'
          />
          {errors.mediaValidacion && (
            <span className='text-danger'>Campo obligatorio</span>
          )}
        </div>
        <div className='col-md-6'>
          <label>Desviación Estándar:</label>
          <input
            {...register('desvValidacion', { required: true })}
            className='form-control'
          />
          {errors.desvValidacion && (
            <span className='text-danger'>Campo obligatorio</span>
          )}
        </div>

        <h3 className='mb-4 mt-4'>Bloqueo de Ruta </h3>
        <div className='col-md-6'>
          <label>Porcentaje de que haya bloqueo:</label>
          <input
            {...register('probBloqueo', { required: true })}
            className='form-control'
          />
          {errors.probBloqueo && (
            <span className='text-danger'>Campo obligatorio</span>
          )}
        </div>
        <div className='col-md-6'>
          <label>Porcentaje de aumento de demora:</label>
          <input
            {...register('porcAumentoDemora', { required: true })}
            className='form-control'
          />
          {errors.porcAumentoDemora && (
            <span className='text-danger'>Campo obligatorio</span>
          )}
        </div>

        <h3 className='mb-4 mt-4'>Parada extra </h3>
        <div className='col-md-6'>
          <label>Porcentaje de que haya una parada extra:</label>
          <input
            {...register('probParadaExtra', { required: true })}
            className='form-control'
          />
          {errors.probParadaExtra && (
            <span className='text-danger'>Campo obligatorio</span>
          )}
        </div>
        <div className='col-md-6'>
          <label>Media:</label>
          <input
            {...register('mediaParadaExtra', { required: true })}
            className='form-control'
          />
          {errors.mediaParadaExtra && (
            <span className='text-danger'>Campo obligatorio</span>
          )}
        </div>

        <div className='col-12'>
          <button
            type='submit'
            className='btn btn-success'
          >
            Ejecutar
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormularioDatosModificables;

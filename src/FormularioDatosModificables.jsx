import { useEffect, useState } from "react"
import {useForm} from "react-hook-form"
import {useNavigate, useParams, useLocation} from "react-router-dom"


const FormularioDatosModificables = () =>{
    const [cines, setCines] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();
    const {register, handleSubmit, reset, formState:{errors}, getValues} = useForm();
    const location = useLocation();
    const modo = location.state?.modo
    const [originalData, setOriginalData] = useState(null);

    return (
        <main className="container mt-5">
      <h3 className="mb-4">: TP 3 - Parqueando</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="col-md-6">
          <label>Pelicula:</label>
          <input {...register("pelicula", { required: true })} className="form-control" />
          {errors.pelicula && <span className="text-danger">Campo obligatorio</span>}
        </div>
       <div className="col-md-6">
         <label>Fecha desde:</label>
        <input
                {...register("fechaDesde", {
                required: true,
                validate: (value) => {
                    const dia = new Date(value).getDay();
                    return dia === 3 || "La fecha debe ser un jueves"; }
            })}
            className="form-control"
            type="date"
            />
        {errors.fechaDesde && (
            <span className="text-danger">{errors.fechaDesde.message || "Campo obligatorio"}</span>
                    )}
            </div>
        <div className="col-md-6">
  <label>Fecha hasta:</label>
  <input
    {...register("fechaHasta", {
      required: "Campo obligatorio",
      validate: {
        noPasada: (value) => {
          const hoy = new Date();
          const fecha = new Date(value);
          return fecha >= hoy || "La fecha no puede ser anterior a hoy";
        },
        diferencia6Dias: (value) => {
          const fechaDesde = new Date(getValues("fechaDesde"));
          const fechaHasta = new Date(value);
          const diff = Math.abs(fechaHasta - fechaDesde);
          const dias = diff / (1000 * 60 * 60 * 24);
          return dias === 6 || "La diferencia con fecha desde debe ser de 6 días";
        }
      }
        })}
        className="form-control"
        type="date"
        />
        {errors.fechaHasta && (
            <span className="text-danger">{errors.fechaHasta.message}</span>
            )}
        </div>

        <div className="col-md-6">
          <label>Horario:</label>
          <input {...register("horario", { required: true })} className="form-control" />
          {errors.horario && <span className="text-danger">Campo obligatorio</span>}
        </div>
        <div className="col-md-6">
          <label>Sala:</label>
          <input {...register("sala", { required: true })} className="form-control" />
          {errors.sala && <span className="text-danger">Campo obligatorio</span>}
        </div>
        <div className="col-md-6">
          <label>Cine:</label>
          <select {...register("idCine", { required: true })} className="form-select">
            <option value="">Seleccione</option>
            {cines.map((cine) => (
              <option key={cine.id} value={cine.id}>{cine.nombre}</option>
            ))}
          </select>
          {errors.idCine && <span className="text-danger">Campo obligatorio</span>}
        </div>
        <div className="col-md-6">
  <label>URL de la carátula:</label>
  <input
    {...register("caratula", {
      validate: value => {
        if (!value) return true; // Si está vacío, pasa la validación porque no es obligatorio
        try {
          new URL(value); // Intenta crear un objeto URL para validar
          return true;
        } catch {
          return "Debe ser una URL válida";
        }
      }
    })}
    className="form-control"
    type="url"
    placeholder="https://ejemplo.com"
  />
  {errors.caratula && <span className="text-danger">{errors.caratula.message}</span>}
</div>
        <div className="col-12">
          <button type="submit" className="btn btn-success">Guardar</button>
        </div>
      </form>
    </main>
    )
}

export default FormularioFunciones
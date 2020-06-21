import React from 'react';

// import Dropzone from './Dropzone.jsx';
//, onDrop
const FormAnime = ({ onChange, onSubmit, formValues, onError }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label>Nombre</label>
            <input
              required
              onChange={onChange}
              name="name"
              type="text"
              className="form-control"
              value={formValues.name}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label>Temporada</label>
            <input
              required
              onChange={onChange}
              name="season"
              type="number"
              className="form-control"
              value={formValues.season}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label>Episodios</label>
            <input
              required
              onChange={onChange}
              name="episode"
              type="number"
              className="form-control"
              value={formValues.episode}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label>Fecha</label>
            <input
              required
              onChange={onChange}
              name="date"
              type="date"
              className="form-control"
              value={formValues.date}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label>Estación</label>
            <select
              required
              onChange={onChange}
              name="station"
              className="custom-select"
              value={formValues.station}
            >
              <option defaultValue="">Seleccione una opción</option>
              <option value="1">Primavera</option>
              <option value="2">Verano</option>
              <option value="3">Otoño</option>
              <option value="4">Invierno</option>
            </select>
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-group">
            <label>Link del anime</label>
            <input
              required
              onChange={onChange}
              name="source"
              type="url"
              className="form-control"
              value={formValues.source}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label>Estado</label>
            <select
              required
              onChange={onChange}
              name="status"
              className="custom-select"
              value={formValues.status}
            >
              <option defaultValue="">Seleccione una opción</option>
              <option value="1">Online</option>
              <option value="3">Finalizado</option>
              <option value="2">Detenido</option>
            </select>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label>Día de estreno</label>
            <select
              required
              onChange={onChange}
              name="premiere"
              className="custom-select"
              value={formValues.premiere}
            >
              <option defaultValue="">Seleccione una opción</option>
              <option value="1">Lunes</option>
              <option value="2">Martes</option>
              <option value="3">Miercoles</option>
              <option value="4">Jueves</option>
              <option value="5">Viernes</option>
              <option value="6">Sabado</option>
              <option value="7">Domingo</option>
            </select>
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label>Resumen</label>
            <textarea
              required
              onChange={onChange}
              name="description"
              className="form-control"
              rows="8"
              value={formValues.description}
            ></textarea>
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label>Imagen</label>
          </div>
        </div>
        {/* <div className="col-md-6">
          <div className="form-group">
            <Dropzone onDrop={onDrop} accept={"image/*"} />
          </div>
        </div> */}
        <div className="col-md-6">
          <div className="form-group">
            <input
              required
              onChange={onChange}
              name="cover"
              type="url"
              className="form-control"
              value={formValues.cover}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            {formValues.cover && (
              <img
                alt="cover"
                src={formValues.cover}
                className="img-thumbnail rounded mx-auto d-block"
              />
            )}
          </div>
        </div>

        {onError && (
          <div className="col-md-12">
            <div className="form-group">
              <div className="alert alert-danger">
                <p>{onError}</p>
              </div>
            </div>
          </div>
        )}
        <div className="col-md-12">
          <div className="form-group">
            <button type="submit" className="btn btn-info btn-lg btn-block">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormAnime;

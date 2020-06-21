import React from 'react';

import Modal from '../pages/Modal.jsx';

function UpEpisodeModal({ isOpen, onClose, onClickUp, onClickDown }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar episodio">
      <div className="DeleteBadgeModal">
        <div className="modal-body">
          <p>Ingrese cuanto aumentar o disminuir el capitulo</p>
          <div className="form-group">
            <input
              required
              id="modalEpisode"
              name="name"
              type="number"
              className="form-control"
              defaultValue="1"
              min="1"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-secondary">
            Cancelar
          </button>
          <button onClick={onClickDown} className="btn btn-danger">
            Bajar
          </button>
          <button onClick={onClickUp} className="btn btn-success">
            Subir
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default UpEpisodeModal;

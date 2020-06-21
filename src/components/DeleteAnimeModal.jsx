import React from "react";

import Modal from "../pages/Modal.jsx";

function DeleteAnimeModal({ isOpen, onClose, onClick }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="¿Está seguro?">
      <div className="modal-body">Está a punto de borrar un anime.</div>
      <div className="modal-footer">
        <button onClick={onClose} className="btn btn-secondary">
          Cancelar
        </button>
        <button onClick={onClick} className="btn btn-danger">
          Borrar
        </button>
      </div>
    </Modal>
  );
}

export default DeleteAnimeModal;

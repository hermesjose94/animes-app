import React from 'react';
import ReactDOM from 'react-dom';

import '../assets/styles/pages/Modal.scss';

function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="Modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" id="staticBackdropLabel">
              {title}
            </h2>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal')
  );
}

export default Modal;

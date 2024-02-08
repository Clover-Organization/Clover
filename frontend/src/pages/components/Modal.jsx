import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modalComp">
        <div className="btnModalClose">
          <button className="modal-close" onClick={onClose}>
            Fechar
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;

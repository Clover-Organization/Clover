import React from "react";
import ReactDOM from "react-dom";
import {
  CardContent,
} from "@/components/ui/card"

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="w-[350px]">
      <CardContent>
        <div className="modal-overlay">

          {children}

        </div>
      </CardContent>
    </div>,
    document.body
  );
};

export default Modal;

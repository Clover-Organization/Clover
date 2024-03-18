import React from "react";
import ReactDOM from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Card className="w-[350px]">
      <CardContent>
        <div className="modal-overlay">

          {children}

        </div>
      </CardContent>
    </Card>,
    document.body
  );
};

export default Modal;

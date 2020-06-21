import React from "react";
import { useDropzone } from "react-dropzone";

import "../assets/styles/components/Dropzone.scss";

const Dropzone = ({ onDrop, accept, value }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  const getClassName = (className, isActive) => {
    if (!isActive) return className;
    return `${className} ${className}-active`;
  };

  return (
    <div className={getClassName("dropzone", isDragActive)} {...getRootProps()}>
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content">
            Suelta para soltar los archivos aquí
          </p>
        ) : (
          <p className="dropzone-content">
            Arrastre y suelte algunos archivos aquí, o haga clic para
            seleccionar archivos
          </p>
        )}
      </div>
    </div>
  );
};

export default Dropzone;

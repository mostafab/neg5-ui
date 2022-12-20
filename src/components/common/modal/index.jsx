import React from "react";
import BootstrapModal from "react-bootstrap/Modal";

const Modal = ({
  onHide,
  children,
  title,
  fullscreen = false,
  className = "",
  size = null,
}) => {
  return (
    <BootstrapModal
      show
      centered
      fullscreen={fullscreen}
      onHide={onHide}
      dialogClassName={className}
      size={size}
    >
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title className="h5">{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>{children}</BootstrapModal.Body>
    </BootstrapModal>
  );
};

export default Modal;

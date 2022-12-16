import React from "react";
import BootstrapAlert from "react-bootstrap/Alert";

const Alert = ({ level, children, className = "" }) => (
  <BootstrapAlert className={className} variant={level}>
    {children}
  </BootstrapAlert>
);

export const Error = ({ children, className = "" }) => (
  <Alert className={className} level="danger">
    {children}
  </Alert>
);

export default Alert;

import React from "react";
import BootstrapAlert from "react-bootstrap/Alert";

import Icon from "@components/common/icon";

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

export const Info = ({ children, className }) => (
  <Alert className={className} level="info">
    <Icon name="InfoCircleFill" className="mb-1 me-2" />
    {children}
  </Alert>
);

export const Warning = ({ children, className }) => (
  <Alert className={className} level="warning">
    <Icon name="ExclamationCircle" className="mb-1 me-2" />
    {children}
  </Alert>
);

export default Alert;

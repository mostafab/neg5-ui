import React from "react";
import Badge from "react-bootstrap/Badge";

const Pill = ({ type, children, onClick = null, className = "" }) => (
  <Badge onClick={onClick} bg={type} className={className}>
    {children}
  </Badge>
);

export default Pill;

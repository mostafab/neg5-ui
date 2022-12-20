import React from "react";
import Badge from "react-bootstrap/Badge";

const Pill = ({ type, children }) => <Badge bg={type}>{children}</Badge>;

export default Pill;

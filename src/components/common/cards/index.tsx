import React from "react";
import { Card as BootstrapCard } from "react-bootstrap";

const Card = ({ title = null, children, className = "" }) => (
  <BootstrapCard className={`shadow-sm ${className}`} body>
    {title && <BootstrapCard.Title> {title} </BootstrapCard.Title>}
    {children}
  </BootstrapCard>
);

export default Card;

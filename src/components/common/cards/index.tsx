import React from "react";
import { Card as BootstrapCard } from "react-bootstrap";

const Card = ({ title = null, children, className = "" }) => (
  <BootstrapCard className={`shadow ${className}`}>
    {title && <BootstrapCard.Title> {title} </BootstrapCard.Title>}
    <BootstrapCard.Body>{children}</BootstrapCard.Body>
  </BootstrapCard>
);

export default Card;

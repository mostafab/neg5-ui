import React from "react";
import { Card as BootstrapCard } from "react-bootstrap";

const Card = ({ title = null, children, className = "", onClick = null }) => (
  <BootstrapCard
    className={`shadow-sm ${className}`}
    body
    role={onClick ? "button" : null}
    onClick={onClick}
  >
    {title && <BootstrapCard.Title> {title} </BootstrapCard.Title>}
    {children}
  </BootstrapCard>
);

export default Card;

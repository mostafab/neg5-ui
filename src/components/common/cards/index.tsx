import React from "react";
import { Card as BootstrapCard } from "react-bootstrap";

const Card = ({
  title = null,
  children,
  className = "",
  onClick = null,
  shadow = true,
  titleAs = undefined,
}) => (
  <BootstrapCard
    className={`${shadow ? "shadow-sm" : ""} ${className}`}
    body
    role={onClick ? "button" : null}
    onClick={onClick}
  >
    {title && <BootstrapCard.Title as={titleAs}> {title} </BootstrapCard.Title>}
    {children}
  </BootstrapCard>
);

export default Card;

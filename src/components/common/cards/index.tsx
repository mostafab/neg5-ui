import React from "react";
import { Card as BootstrapCard } from "react-bootstrap";

import Icon from "@components/common/icon";

const Card = ({
  title = null,
  children,
  className = "",
  onClick = null,
  shadow = true,
  actions = null,
}) => (
  <BootstrapCard
    className={`${shadow ? "shadow-sm" : ""} ${className}`}
    body
    role={onClick ? "button" : null}
    onClick={onClick}
  >
    {title && (
      <BootstrapCard.Title>
        {actions && actions.length > 0 ? (
          <div className="d-flex justify-content-between">
            <span>{title}</span>
            <span>
              {actions.map((a, idx) => (
                <span
                  key={idx}
                  className={idx < actions.length - 1 ? "me-2" : ""}
                >
                  {a.component || (
                    <Icon key={idx} name={a.icon} onClick={a.onClick} />
                  )}
                </span>
              ))}
            </span>
          </div>
        ) : (
          title
        )}
      </BootstrapCard.Title>
    )}
    {children}
  </BootstrapCard>
);

export default Card;

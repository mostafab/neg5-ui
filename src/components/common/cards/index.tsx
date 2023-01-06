import React from "react";
import { Card as BootstrapCard } from "react-bootstrap";

import Icon from "@components/common/icon";
import DropdownActions from "@components/common/DropdownActions";

const Card = ({
  title = null,
  children,
  className = "",
  onClick = null,
  shadow = true,
  actions = null,
  actionsAsDropdown = false,
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
            {actionsAsDropdown ? (
              <DropdownActions actions={actions} />
            ) : (
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
            )}
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

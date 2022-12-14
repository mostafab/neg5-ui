import React, { forwardRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";

import Icon from "@components/common/icon";

/* eslint-disable react/display-name */
const ToggleWrapper = forwardRef(({ children, onClick }, ref) => {
  return (
    <a
      role="button"
      className="text-info"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  );
});

const renderItem = (action) => {
  if (!action) {
    return null;
  }
  const { label, onClick } = action;
  return (
    <Dropdown.Item onClick={onClick} className="small">
      {label}
    </Dropdown.Item>
  );
};

const DropdownActions = ({ className = "", actions = [] }) => {
  return (
    <Dropdown className={className}>
      <Dropdown.Toggle size="sm" as={ToggleWrapper}>
        <Icon name="ThreeDots" size="20" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="br-0">
        {actions.map((action, idx) => {
          return (
            <span key={idx}>
              {renderItem(action)}
              {action.separator && action.separator}
            </span>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownActions;

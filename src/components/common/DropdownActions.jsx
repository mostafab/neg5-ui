import React, { forwardRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";

import Icon from "@components/common/icon";

const toggleWrapper = forwardRef(({ children, onClick }, ref) => {
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
    <Dropdown.Item onClick={onClick} className="small" key={label}>
      {label}
    </Dropdown.Item>
  );
};

const DropdownActions = ({ className = "", actions = [] }) => {
  return (
    <Dropdown className={className}>
      <Dropdown.Toggle size="sm" as={toggleWrapper}>
        <Icon name="ThreeDots" size="20" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="br-0">
        {actions.map((action) => renderItem(action))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownActions;

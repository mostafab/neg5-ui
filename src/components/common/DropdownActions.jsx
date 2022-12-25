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

const renderItem = (itemProps) => {
  if (!itemProps) {
    return null;
  }
  const { label, onClick } = itemProps;
  return (
    <Dropdown.Item onClick={onClick} className="small">
      {label}
    </Dropdown.Item>
  );
};

const DropdownActions = ({ className = "", deleteActionProps = null }) => {
  return (
    <Dropdown className={className}>
      <Dropdown.Toggle size="sm" as={toggleWrapper}>
        <Icon name="ThreeDots" size="20" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="br-0">
        {renderItem(deleteActionProps)}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownActions;

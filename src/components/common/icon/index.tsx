import React from "react";
import * as icons from "react-bootstrap-icons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Icon = ({ name, ...props }) => {
  const Component = icons[name];
  if (!Component) {
    throw new Error(`Invalid icon name: ${name} given.`);
  }
  const component = (
    <Component {...props} role={props.onClick ? "button" : null} />
  );
  return props.message ? (
    <OverlayTrigger
      trigger={["hover", "focus", "click"]}
      placement="top"
      overlay={<Tooltip id="warning-tooltip">{props.message}</Tooltip>}
    >
      <span className={props.className}>{component}</span>
    </OverlayTrigger>
  ) : (
    component
  );
};

export const Warning = (props) =>
  props.message ? (
    <OverlayTrigger
      trigger={["hover", "focus", "click"]}
      placement="top"
      overlay={<Tooltip id="warning-tooltip">{props.message}</Tooltip>}
    >
      <span className={props.className}>
        <Icon {...props} name="ExclamationCircleFill" fill="orange" />
      </span>
    </OverlayTrigger>
  ) : (
    <Icon {...props} name="ExclamationCircleFill" fill="orange" />
  );

export const Expand = (props) => (
  <Icon className="expand" name="ArrowsAngleExpand" {...props} />
);

export const X = (props) => <Icon className="x" name="X" {...props} />;

export default Icon;

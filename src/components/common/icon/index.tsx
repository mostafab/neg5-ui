import React from "react";
import BootstrapSpinner from "react-bootstrap/Spinner";
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

export const Add = (props) => <Icon name="PlusSquare" {...props} />;

export const X = (props) => <Icon className="x" name="X" {...props} />;

export const Edit = (props) => (
  <Icon className="edit" name="PencilSquare" {...props} />
);

export const Spinner = (props) => (
  <BootstrapSpinner size="sm" animation="border" {...props} />
);

export const Check = (props) => (
  <Icon name="CheckCircleFill" fill="#18BC9C" {...props} />
);

export default Icon;

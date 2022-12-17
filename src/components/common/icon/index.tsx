import React from "react";
import * as icons from "react-bootstrap-icons";

const Icon = ({ name, ...props }) => {
  const Component = icons[name];
  if (!Component) {
    throw new Error(`Invalid icon name: ${name} given.`);
  }
  return <Component {...props} />;
};

export default Icon;

import BootstrapButton from "react-bootstrap/Button";

import Icon from "@components/common/icon";

const Button = ({
  children,
  type,
  href = null,
  onClick = null,
  className = "",
  icon = null,
  size = null,
}) => (
  <BootstrapButton
    className={className}
    onClick={onClick}
    href={href}
    variant={type}
    size={size}
  >
    {children}
    {icon && <Icon name={icon} />}
  </BootstrapButton>
);

export default Button;

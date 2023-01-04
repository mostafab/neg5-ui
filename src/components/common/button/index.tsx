import BootstrapButton from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import Icon from "@components/common/icon";

const Button = ({
  children,
  type,
  href = null,
  onClick = null,
  className = "",
  icon = null,
  size = null,
  submit = false,
  disabled = false,
  submitting = false,
}) => (
  <BootstrapButton
    className={className}
    onClick={onClick}
    href={href}
    variant={type}
    size={size}
    type={submit ? "submit" : "button"}
    disabled={disabled || submitting}
  >
    {children}
    {!submitting && icon && <Icon name={icon} />}
    {submitting && <Spinner animation="border" size="sm" className="ms-2"/>}
  </BootstrapButton>
);

export default Button;

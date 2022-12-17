import BootstrapButton from "react-bootstrap/Button";

const Button = ({
  children,
  type,
  href = null,
  onClick = null,
  className = "",
}) => (
  <BootstrapButton
    className={className}
    onClick={onClick}
    href={href}
    variant={type}
  >
    {children}
  </BootstrapButton>
);

export default Button;

import BootstrapButton from "react-bootstrap/Button";

const Button = ({ children, type, href = null, onClick = null }) => (
  <BootstrapButton onClick={onClick} href={href} variant={type}>
    {children}
  </BootstrapButton>
);

export default Button;

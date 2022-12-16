import React from "react";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const Navbar = ({ page = "Home" }) => (
  <BootstrapNavbar variant="light" bg="light" className="shadow">
    <Container>
      <BootstrapNavbar.Toggle aria-controls="navbar" />
      <BootstrapNavbar.Collapse id="navbar" className="justify-content-end">
        <BootstrapNavbar.Text>{page}</BootstrapNavbar.Text>
      </BootstrapNavbar.Collapse>
    </Container>
  </BootstrapNavbar>
);

export default Navbar;

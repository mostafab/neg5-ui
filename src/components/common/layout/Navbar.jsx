import React from "react";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const Navbar = ({ currentUser = {} }) => (
  <BootstrapNavbar variant="light" bg="light" className="shadow-sm">
    <Container>
      <BootstrapNavbar.Toggle aria-controls="navbar" />
      <BootstrapNavbar.Collapse id="navbar" className="justify-content-end">
        <BootstrapNavbar.Text>
          {currentUser.data?.username}
        </BootstrapNavbar.Text>
      </BootstrapNavbar.Collapse>
    </Container>
  </BootstrapNavbar>
);

export default Navbar;

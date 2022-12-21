import React from "react";
import BootstrapNavbar from "react-bootstrap/Navbar";
import BootstrapNavDropdown from "react-bootstrap/NavDropdown";
import BootstrapNav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const Navbar = ({ currentUser = {} }) => (
  <BootstrapNavbar variant="light" bg="light" className="shadow-sm">
    <Container>
      <BootstrapNavbar.Toggle aria-controls="navbar" />
      <BootstrapNavbar.Collapse id="navbar" className="justify-content-end">
        <BootstrapNav>
          <BootstrapNavDropdown title={currentUser.data?.username}>
            <BootstrapNavDropdown.Item onClick={() => console.log("Logout!!")}>
              Logout
            </BootstrapNavDropdown.Item>
          </BootstrapNavDropdown>
        </BootstrapNav>
      </BootstrapNavbar.Collapse>
    </Container>
  </BootstrapNavbar>
);

export default Navbar;

import React from "react";
import BootstrapNavbar from "react-bootstrap/Navbar";
import BootstrapNavDropdown from "react-bootstrap/NavDropdown";
import BootstrapNav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Link from "next/link";

import { useAppDispatch } from "@store";
import { logout } from "@features/login/loginSlice";

const Navbar = ({ currentUser = {} }) => {
  const dispatch = useAppDispatch();
  return (
    <BootstrapNavbar>
      <Container>
        <BootstrapNavbar.Toggle aria-controls="navbar" />
        <BootstrapNavbar.Collapse id="navbar" className="justify-content-end">
          <BootstrapNavbar.Text>
            <Link href="/">Tournaments</Link>
          </BootstrapNavbar.Text>
          <BootstrapNav>
            <BootstrapNavDropdown title={currentUser.data?.username}>
              <BootstrapNavDropdown.Item onClick={() => dispatch(logout())}>
                Logout
              </BootstrapNavDropdown.Item>
            </BootstrapNavDropdown>
          </BootstrapNav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;

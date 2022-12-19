import React from "react";

import Navbar from "@features/navbar/container";

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

export default Layout;

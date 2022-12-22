import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { useAppDispatch } from "@store";
import { getCurrentUserAsync } from "@features/login/loginSlice";
import Navbar from "@features/navbar/container";

const AuthenticatedLayout = ({ children, currentUser }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCurrentUserAsync());
  }, [children]);
  // Case 1: Just loaded, we don't have user data yet
  if (!currentUser.data && !currentUser.loaded) {
    return null;
    // Case 2: Finished loading, but no user is signed in
  } else if (!currentUser.data && currentUser.loaded) {
    router.push("/");
  } else {
    // Case 3: User is loaded
    return (
      <>
        <Navbar />
        {children}
      </>
    );
  }
};

export default AuthenticatedLayout;

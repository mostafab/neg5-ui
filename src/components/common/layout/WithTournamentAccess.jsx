import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { useAppDispatch } from "@store";
import { loadTournamentPermissionsAsync } from "@features/tournamentPermissions/tournamentPermissionsSlice";

const WithTournamentAccess = ({ children, permissions }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const tournamentId = router.query.id;
  useEffect(() => {
    dispatch(loadTournamentPermissionsAsync(tournamentId));
  }, [tournamentId]);
  if (!permissions.data) {
    return null;
  } else if (permissions.data.accessLevel === "NONE") {
    router.push("/access-denied");
  } else {
    // Case 3: User is loaded
    return <>{children}</>;
  }
};

export default WithTournamentAccess;

import React, { useEffect } from "react";

import { useAppDispatch } from "@store";
import { loadTournamentDataAsync } from "@features/tournamentView/tournamentInfoSlice";

const TournamentRootView = ({ tournamentId }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadTournamentDataAsync(tournamentId))
  }, [tournamentId]);
  return (
    <div>Hello</div>
  )
};

export default TournamentRootView;

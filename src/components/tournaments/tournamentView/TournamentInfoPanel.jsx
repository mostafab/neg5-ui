import React from "react";

import Card from "@components/common/cards";

import { labelWithValue } from "./utilities";

const TournamentInfoPanel = ({ tournamentInfo }) => {
  return (
    <Card title={tournamentInfo.name}>
      {labelWithValue("Owner", tournamentInfo.directorId)}
      {labelWithValue("Date", tournamentInfo.tournamentDate)}
      {labelWithValue("Location", tournamentInfo.location)}
      {labelWithValue("Question Set", tournamentInfo.questionSet)}
    </Card>
  );
};

export default TournamentInfoPanel;

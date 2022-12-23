import React from "react";

import Card from "@components/common/cards";

import { labelWithValue } from "./utilities";

const TournamentInfoPanel = ({ tournamentInfo }) => {
  return (
    <Card title={<h3>{tournamentInfo.name}</h3>}>
      {labelWithValue("Owner", tournamentInfo.directorId)}
      {labelWithValue("Date", tournamentInfo.tournamentDate)}
      {labelWithValue("Location", tournamentInfo.location)}
      {labelWithValue("Question Set", tournamentInfo.questionSet)}
    </Card>
  );
};

export default TournamentInfoPanel;

import React from "react";

import Card from "@components/common/cards";

import { labelWithValue } from "./utilities";

const TournamentRulesPanel = ({ rules }) => {
  return (
    <Card title="Rules">
      {labelWithValue("Bonus Point Value", rules.bonusPointValue)}
      {labelWithValue("Parts Per Bonus", rules.partsPerBonus)}
      {labelWithValue("Max Players", rules.maxActivePlayersPerTeam)}
      {labelWithValue("Ties Allowed", rules.allowTies ? "Yes" : "No")}
    </Card>
  );
};

export default TournamentRulesPanel;

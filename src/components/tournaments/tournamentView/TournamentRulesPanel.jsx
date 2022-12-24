import React from "react";

import Card from "@components/common/cards";
import TossupValuePill from "@components/tournaments/common/TossupValuePill";

import { labelWithValue } from "./utilities";

const TournamentRulesPanel = ({ rules }) => {
  return (
    <Card title="Rules">
      {labelWithValue("Bonus Point Value", rules.bonusPointValue)}
      {labelWithValue("Parts Per Bonus", rules.partsPerBonus)}
      {labelWithValue("Max Players", rules.maxActivePlayersPerTeam)}
      {labelWithValue("Bouncebacks", rules.usesBouncebacks ? "Yes" : "No")}
      {labelWithValue("Ties Allowed", rules.allowTies ? "Yes" : "No")}
      <hr />
      <h5>Tossup Point Values</h5>
      {rules.tossupValues.map((tv) => {
        return (
          <span key={tv.value}>
            <TossupValuePill {...tv} />{" "}
          </span>
        );
      })}
    </Card>
  );
};

export default TournamentRulesPanel;

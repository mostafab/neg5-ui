import React, { useState } from "react";

import Card from "@components/common/cards";
import { Edit } from "@components/common/icon";
import TossupValuePill from "@components/tournaments/common/TossupValuePill";
import RulesModal from "@components/tournaments/rules/RulesModal";

import { labelWithValue } from "./utilities";

const TournamentRulesPanel = ({ rules, editable }) => {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Card
        title="Rules"
        actions={
          editable
            ? [
                {
                  component: <Edit onClick={() => setShowForm(true)} />,
                  icon: "PencilSquare",
                  onClick: () => setShowForm(true),
                },
              ]
            : []
        }
      >
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
      {showForm && (
        <RulesModal onHide={() => setShowForm(false)} rules={rules} />
      )}
    </>
  );
};

export default TournamentRulesPanel;

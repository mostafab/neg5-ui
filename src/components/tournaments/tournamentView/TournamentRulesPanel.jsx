import React, { useState, useContext, useEffect } from "react";

import { useAppDispatch } from "@store";
import { rulesUpdated } from "@features/tournamentView/rulesSlice";
import { Events } from "@libs/liveEvents";

import Card from "@components/common/cards";
import { Edit } from "@components/common/icon";
import { TournamentLiveChangesContext } from "@components/tournaments/common/context";
import TossupValuePill from "@components/tournaments/common/TossupValuePill";
import RulesModal from "@components/tournaments/rules/RulesModal";

import { labelWithValue } from "./utilities";

const TournamentRulesPanel = ({ rules, editable }) => {
  const [showForm, setShowForm] = useState(false);
  const liveUpdatesContext = useContext(TournamentLiveChangesContext);
  const dispatch = useAppDispatch();
  useEffect(() => {
    liveUpdatesContext.subscribe(Events.rules.updated, (data) => {
      dispatch(rulesUpdated(data));
    });

    return () => {
      liveUpdatesContext.unsubscribe(Events.rules.updated);
    };
  }, [liveUpdatesContext]);
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

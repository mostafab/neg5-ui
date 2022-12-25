import React from "react";

import { formatAddedAtDate } from "@libs/dates";
import DropdownActions from "@components/common/DropdownActions";

import MatchForm from "./MatchForm";

const MatchDisplay = ({ selectedMatch, teams, rules, playersById, phases }) => {
  const match = selectedMatch;
  return (
    <div className="sticky-top">
      <div className="mb-3">
        {match.addedAt && (
          <span className="small text-dark">
            Added {formatAddedAtDate(match.addedAt)}
          </span>
        )}
        <DropdownActions
          className="float-end"
          deleteActionProps={{
            label: "Delete",
            onClick: () => console.log(match),
          }}
        />
      </div>
      <MatchForm
        match={match}
        teams={teams}
        rules={rules}
        playersById={playersById}
        phases={phases}
      />
    </div>
  );
};

export default MatchDisplay;

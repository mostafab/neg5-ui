import React from "react";

import { formatAddedAtDate } from "@libs/dates";
import DropdownActions from "@components/common/DropdownActions";

import MatchForm from "./MatchForm";

const MatchDisplay = ({ selectedMatch, teams, rules, playersById, phases }) => {
  const match = selectedMatch;
  return (
    <div>
      {match.id && (
        <div className="mb-3 d-flex justify-content-between">
          {match.addedAt && (
            <span className="small text-dark">
              Added {formatAddedAtDate(match.addedAt)}
            </span>
          )}
          <DropdownActions
            actions={[
              {
                label: <span className="text-gray">Edit</span>,
                onClick: () => console.log(match),
                separator: <hr className="mt-1 mb-1" />,
              },
              {
                label: <span className="text-danger">Delete Match</span>,
                onClick: () => console.log(match),
              },
            ]}
          />
        </div>
      )}
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

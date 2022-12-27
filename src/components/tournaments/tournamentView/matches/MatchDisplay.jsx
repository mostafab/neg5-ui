import React, { useState } from "react";

import { formatAddedAtDate } from "@libs/dates";
import DropdownActions from "@components/common/DropdownActions";
import Card from "@components/common/cards";

import MatchForm from "./MatchForm";

const MatchDisplay = ({ selectedMatch, teams, rules, playersById, phases }) => {
  const match = selectedMatch;
  const [readOnly, setReadOnly] = useState(true);
  return (
    <Card>
      {match.id && (
        <div className="mb-3 d-flex justify-content-between">
          {readOnly && <DropdownActions
            actions={[
              {
                label: <span className="text-gray">Edit</span>,
                onClick: () => setReadOnly(false),
                separator: <hr className="mt-1 mb-1" />,
              },
              {
                label: <span className="text-danger">Delete Match</span>,
                onClick: () => console.log(match),
              },
            ]}
          />}
          {match.addedAt && (
            <span className="small text-dark">
              Added {formatAddedAtDate(match.addedAt)}
            </span>
          )}
        </div>
      )}
      <MatchForm
        match={match}
        teams={teams}
        rules={rules}
        playersById={playersById}
        phases={phases}
        readOnly={readOnly && match.id}
        onCancel={() => setReadOnly(true)}
      />
    </Card>
  );
};

export default MatchDisplay;

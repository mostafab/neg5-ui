import React, { useState } from "react";
import dayjs from "dayjs";

import Card from "@components/common/cards";
import { X } from "@components/common/icon";

const scoresheetTitle = (teams, scoresheet) => {
  const teamVsString = [scoresheet.team1Id, scoresheet.team2Id]
    .map((teamId) => {
      return teams.find((t) => t.id === teamId).name;
    })
    .join(" vs ");

  return `Round ${scoresheet.round} - ${teamVsString}`;
};

const ScoresheetsList = ({
  scoresheets,
  onSelect,
  currentUser,
  teams,
  onDelete,
}) => {
  const [showAll, setShowAll] = useState(false);
  return (
    <>
      <div>
        {scoresheets.map((scoresheet) => (
          <Card
            key={scoresheet.id}
            title={<h6>{scoresheetTitle(teams, scoresheet)}</h6>}
            className="mb-3"
            onClick={() => onSelect(scoresheet)}
            actions={[
              {
                component: <X onClick={() => onDelete(scoresheet)} size="25" />,
              },
            ]}
          >
            <div className="small">{scoresheet.cycles.length} TUHs</div>
            {scoresheet.lastUpdatedAt && (
              <div className="small text-dark">
                Last updated {dayjs(scoresheet.lastUpdatedAt).format("hh:mm A")}
              </div>
            )}
            <div className="small text-dark">
              Started by {scoresheet.addedBy}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ScoresheetsList;

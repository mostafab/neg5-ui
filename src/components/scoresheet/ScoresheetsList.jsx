import React, { useState } from "react";
import dayjs from "dayjs";

import Card from "@components/common/cards";
import { Form, Checkbox } from "@components/common/forms";
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
  const [limitList, setLimit] = useState(true);
  return (
    <>
      <Form
        name="ScoresheetFilterForm"
        customCtaButtons
        initialValues={{ limit: limitList }}
      >
        <Checkbox name="limit" label="Only Mine" onChange={setLimit} />
      </Form>
      <div>
        {scoresheets
          .filter((s) => !limitList || s.addedBy === currentUser.username)
          .map((scoresheet) => (
            <Card
              key={scoresheet.id}
              title={
                <h6>
                  <a
                    role="button"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelect(scoresheet);
                    }}
                    href="#"
                  >
                    {scoresheetTitle(teams, scoresheet)}
                  </a>
                </h6>
              }
              className="mb-3"
              actions={[
                {
                  component: (
                    <X
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(scoresheet);
                      }}
                      size="25"
                    />
                  ),
                },
              ]}
            >
              <div className="small">
                {scoresheet.cycles.length}{" "}
                {scoresheet.cycles.length === 1 ? "TUH" : "TUHs"}
              </div>
              {scoresheet.moderator && (
                <div className="small">Moderator: {scoresheet.moderator}</div>
              )}
              {scoresheet.lastUpdatedAt && (
                <div className="small text-dark mt-1">
                  Last updated{" "}
                  {dayjs(scoresheet.lastUpdatedAt).format("MMM DD hh:mm A")}
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

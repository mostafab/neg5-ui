import React, { useState } from "react";
import dayjs from "dayjs";
import orderBy from "lodash/orderBy";

import { ScoresheetState } from "@libs/enums";

import Card from "@components/common/cards";
import { Form, Checkbox } from "@components/common/forms";
import { X } from "@components/common/icon";

const scoresheetTitle = (teams, scoresheet, DraftIcon = null) => {
  const teamVsString = [scoresheet.team1Id, scoresheet.team2Id]
    .map((teamId) => {
      return teams.find((t) => t.id === teamId).name;
    })
    .join(" vs ");

  return (
    <span>
      Round {scoresheet.round} - {teamVsString}
      {DraftIcon && scoresheet.status === ScoresheetState.Draft && (
        <DraftIcon className="ms-2" />
      )}
    </span>
  );
};

const ScoresheetsList = ({
  scoresheets,
  onSelect,
  currentUser,
  teams,
  onDelete,
  filter = true,
  draftIcon = null,
}) => {
  const [limitList, setLimit] = useState(filter);
  return (
    <>
      {filter && (
        <Form
          name="ScoresheetFilterForm"
          customCtaButtons
          initialValues={{ limit: limitList }}
        >
          <Checkbox name="limit" label="Only Mine" onChange={setLimit} />
        </Form>
      )}
      <div>
        {orderBy(scoresheets, "lastUpdatedAt", "desc")
          .filter((s) => !limitList || s.addedBy === currentUser.username)
          .map((scoresheet) => (
            <Card
              key={scoresheet.id}
              shadow={false}
              title={
                <h6>
                  {onSelect ? (
                    <a
                      role="button"
                      onClick={(e) => {
                        e.preventDefault();
                        onSelect(scoresheet);
                      }}
                      href="#"
                    >
                      {scoresheetTitle(teams, scoresheet, draftIcon)}
                    </a>
                  ) : (
                    scoresheetTitle(teams, scoresheet, draftIcon)
                  )}
                </h6>
              }
              className="mb-3"
              actions={
                onDelete
                  ? [
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
                    ]
                  : null
              }
            >
              <div className="small">
                {scoresheet.cycles.length}{" "}
                {scoresheet.cycles.length === 1 ? "TUH" : "TUHs"}
              </div>
              {scoresheet.moderator && (
                <div className="small">Moderator: {scoresheet.moderator}</div>
              )}
              {scoresheet.room && (
                <div className="small">Room: {scoresheet.room}</div>
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

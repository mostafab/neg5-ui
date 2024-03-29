import React, { useState } from "react";
import dayjs from "dayjs";
import orderBy from "lodash/orderBy";

import Card from "@components/common/cards";
import { Form, Checkbox } from "@components/common/forms";
import { X } from "@components/common/icon";

export const scoresheetTitle = (teams, scoresheet) => {
  const teamVsString = [scoresheet.team1Id, scoresheet.team2Id]
    .map((teamId) => {
      return teams.find((t) => t.id === teamId)?.name;
    })
    .join(" vs ");
  return (
    <span>
      Round {scoresheet.round} - {teamVsString}
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
  selectable = () => true,
  maxHeight,
}) => {
  const [limitList, setLimit] = useState(filter);
  const styles = maxHeight
    ? {
        maxHeight,
        overflow: "scroll",
      }
    : {};
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
      <div style={styles}>
        {orderBy(scoresheets, "lastUpdatedAt", "desc")
          .filter((s) => !limitList || s.addedBy === currentUser.username)
          .map((scoresheet) => (
            <Card
              key={scoresheet.id}
              shadow={false}
              title={
                <h6>
                  {onSelect && selectable(scoresheet) ? (
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
                  ) : (
                    scoresheetTitle(teams, scoresheet)
                  )}
                </h6>
              }
              className="mb-3"
              actions={
                onDelete && selectable(scoresheet)
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

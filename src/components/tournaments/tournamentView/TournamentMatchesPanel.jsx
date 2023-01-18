/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import keyBy from "lodash/keyBy";

import { Events } from "@libs/liveEvents";
import { getMatchTeamsDisplayString } from "@libs/matches";
import { useAppDispatch } from "@store";
import {
  loadScoresheetsAsync,
  matchCreatedOrUpdated,
  matchDeleted,
  loadSchedulesAsync,
} from "@features/tournamentView/matchesSlice";

import Card from "@components/common/cards";
import Icon, { Add } from "@components/common/icon";
import toast from "@components/common/toast";

import ScoresheetModal from "@components/scoresheet/ScoresheetModal";
import { scoresheetTitle } from "@components/scoresheet/ScoresheetsList";
import SchedulingModal from "@components/scheduling/SchedulingModal";
import MatchesAccordian from "@components/tournaments/tournamentView/matches/MatchesAccordian";
import MatchesModal from "@components/tournaments/tournamentView/matches/MatchesModal";
import InProgressMatchesPanel from "@components/tournaments/tournamentView/matches/InProgressMatchesPanel";
import {
  TournamentLiveChangesContext,
  TournamentIdContext,
} from "@components/tournaments/common/context";

const TournamentMatchesPanel = ({
  matches,
  draftScoresheets,
  teams,
  rules,
  playersById,
  phases,
  pools,
  currentUser,
  schedules,
  scheduledMatches,
  permissions,
}) => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showScoresheet, setShowScoresheet] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const tournamentId = useContext(TournamentIdContext);
  const liveChangesContext = useContext(TournamentLiveChangesContext);
  const dispatch = useAppDispatch();
  useEffect(() => {
    liveChangesContext.subscribe(Events.scoresheet.createdOrUpdated, (data) => {
      const { isNew, ...rest } = data;
      dispatch(loadScoresheetsAsync(tournamentId));
      if (isNew) {
        toast(
          `${rest.addedBy} started a new match.`,
          scoresheetTitle(teams, rest),
          {
            type: "info",
          }
        );
      }
    });
    liveChangesContext.subscribe(Events.match.createdOrUpdated, (data) => {
      const { oldId, match } = data;
      dispatch(matchCreatedOrUpdated({ match, oldId }));
      if (!oldId) {
        const teamsById = keyBy(teams, "id");
        toast(
          "A match was just submitted",
          getMatchTeamsDisplayString(match, teamsById, {
            includeRound: true,
          }),
          { type: "success" }
        );
      }
    });
    liveChangesContext.subscribe(Events.match.deleted, ({ matchId }) => {
      dispatch(matchDeleted({ matchId }));
    });
    liveChangesContext.subscribe(
      Events.schedule.createdOrUpdated,
      ({ tournamentPhaseId }) => {
        dispatch(loadSchedulesAsync(tournamentId));
        const phaseName = phases.find((p) => p.id === tournamentPhaseId)?.name;
        toast(`Schedule updated`, `${phaseName} schedule was just updated.`);
      }
    );

    return () => {
      liveChangesContext.unsubscribe(Events.scoresheet.createdOrUpdated);
      liveChangesContext.unsubscribe(Events.match.createdOrUpdated);
      liveChangesContext.unsubscribe(Events.match.deleted);
      liveChangesContext.unsubscribe(Events.schedule.createdOrUpdated);
    };
  }, [liveChangesContext, teams, tournamentId, phases]);
  const enoughTeamsToAddMatch = teams.length >= 2;
  const actions =
    enoughTeamsToAddMatch && (matches.length > 0 || draftScoresheets.length > 0)
      ? [
          {
            component: (
              <Add message="Add Match" onClick={() => setSelectedMatch({})} />
            ),
          },
          {
            component: (
              <Icon
                className="ms-2"
                name="ClipboardPlus"
                message="Start/Resume a Scoresheet"
                onClick={() => setShowScoresheet(true)}
              />
            ),
          },
        ]
      : [];
  actions.push({
    component: (
      <Icon
        name="Calendar"
        className="ms-2"
        message="Schedule"
        onClick={() => setShowSchedule(true)}
      />
    ),
  });

  const { scheduleEditable, matchesEditable } = permissions;
  return (
    <>
      <Row>
        {draftScoresheets.length > 0 && (
          <Col lg={6} md={6} sm={12}>
            <InProgressMatchesPanel
              teams={teams}
              draftScoresheets={draftScoresheets}
              currentUser={currentUser}
              rules={rules}
            />
          </Col>
        )}

        <Col
          lg={draftScoresheets.length > 0 ? 6 : 12}
          md={draftScoresheets.length > 0 ? 6 : 12}
          sm={12}
        >
          <Card
            title={
              <span>
                Recorded Matches {matches.length > 0 && `(${matches.length})`}
              </span>
            }
            actions={actions}
          >
            {!enoughTeamsToAddMatch && (
              <div className="d-flex p-2 justify-content-center">
                Add at least two teams to add matches.
              </div>
            )}
            {enoughTeamsToAddMatch && matches.length === 0 && (
              <div className="d-flex p-2 justify-content-center">
                <div style={{ textAlign: "center" }}>
                  On tournament day, you can{" "}
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedMatch({});
                    }}
                    href=""
                  >
                    manually record
                  </a>{" "}
                  a match, or use the{" "}
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setShowScoresheet(true);
                    }}
                  >
                    scoresheet
                  </a>{" "}
                  for future matches. Matches you or any collaborators add will
                  show up here.
                </div>
              </div>
            )}
            <MatchesAccordian
              matches={matches}
              teams={teams}
              onSelectMatch={(match) => setSelectedMatch(match)}
            />
          </Card>
        </Col>
      </Row>
      {selectedMatch && (
        <MatchesModal
          matches={matches}
          teams={teams}
          selectedMatch={selectedMatch}
          onHide={() => setSelectedMatch(null)}
          onSelectMatch={(match) => setSelectedMatch(match)}
          rules={rules}
          playersById={playersById}
          phases={phases}
          canEditAllMatches={matchesEditable}
        />
      )}
      {showScoresheet && (
        <ScoresheetModal
          onHide={() => setShowScoresheet(false)}
          teams={teams}
          rules={rules}
          phases={phases}
          currentUser={currentUser}
          scoresheets={draftScoresheets}
          schedules={schedules}
          scheduledMatches={scheduledMatches}
          onViewCreatedMatch={(matchId) => {
            setShowScoresheet(false);
            setSelectedMatch(matches.find((m) => m.id === matchId));
          }}
        />
      )}
      {showSchedule && (
        <SchedulingModal
          teams={teams}
          phases={phases}
          pools={pools}
          schedules={schedules}
          onHide={() => setShowSchedule(false)}
          editable={scheduleEditable}
        />
      )}
    </>
  );
};

export default TournamentMatchesPanel;

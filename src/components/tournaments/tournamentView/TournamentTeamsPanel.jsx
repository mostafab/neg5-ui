import React, { useState, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import orderBy from "lodash/orderBy";
import chunk from "lodash/chunk";

import { useAppDispatch } from "@store";
import { loadTournamentTeamsAsync } from "@features/tournamentView/teamsSlice";
import { Events } from "@libs/liveEvents";

import { Add } from "@components/common/icon";
import Card from "@components/common/cards";
import {
  TournamentLiveChangesContext,
  TournamentIdContext,
} from "@components/tournaments/common/context";
import TeamsModal from "@components/tournaments/tournamentView/teams/TeamsModal";
import TeamsList from "@components/tournaments/tournamentView/teams/TeamsList";
import NoTeamsAdded from "@components/tournaments/tournamentView/teams/NoTeamsAdded";
import { useEffect } from "react";

const TournamentTeamsPanel = ({ teams, matches, editable, teamGroups }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const liveUpdatesContext = useContext(TournamentLiveChangesContext);
  const tournamentId = useContext(TournamentIdContext);
  const dispatch = useAppDispatch();
  useEffect(() => {
    liveUpdatesContext.subscribe(Events.teams.createdOrUpdated, () => {
      dispatch(loadTournamentTeamsAsync(tournamentId));
    });
    liveUpdatesContext.subscribe(Events.teams.deleted, () => {
      dispatch(loadTournamentTeamsAsync(tournamentId));
    });
    liveUpdatesContext.subscribe(Events.teams.teamGroupAddedOrUpdated, () => {
      dispatch(loadTournamentTeamsAsync(tournamentId));
    });
    return () => {
      liveUpdatesContext.unsubscribe(Events.teams.createdOrUpdated);
      liveUpdatesContext.unsubscribe(Events.teams.deleted);
      liveUpdatesContext.unsubscribe(Events.teams.teamGroupAddedOrUpdated);
    };
  }, [liveUpdatesContext]);
  const orderedAndChunked = chunk(orderBy(teams, "name"), 10);
  return (
    <>
      <Card
        title={teams.length > 0 ? `Teams (${teams.length})` : "Teams"}
        actions={
          teams.length === 0 || !editable
            ? []
            : [
                {
                  component: (
                    <Add
                      message="Add a Team"
                      className="float-end"
                      onClick={() => setSelectedTeam({})}
                    />
                  ),
                },
              ]
        }
      >
        {teams.length === 0 && (
          <NoTeamsAdded onAddTeam={() => setSelectedTeam({})} />
        )}
        <Row>
          {orderedAndChunked.map((chunk, idx) => (
            <Col lg={4} md={6} sm={12} key={idx} className="mb-3">
              <TeamsList
                teams={chunk}
                selectedTeam={selectedTeam}
                onSelectTeam={setSelectedTeam}
              />
            </Col>
          ))}
        </Row>
      </Card>
      {selectedTeam && (
        <TeamsModal
          teams={teams}
          teamGroups={teamGroups}
          onHide={() => setSelectedTeam(null)}
          onSelectTeam={setSelectedTeam}
          selectedTeam={selectedTeam}
          matches={matches}
          editable={editable}
        />
      )}
    </>
  );
};

export default TournamentTeamsPanel;

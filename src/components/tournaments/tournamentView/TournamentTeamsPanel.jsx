import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import orderBy from "lodash/orderBy";
import chunk from "lodash/chunk";

import { Add } from "@components/common/icon";
import Card from "@components/common/cards";
import TeamsModal from "@components/tournaments/tournamentView/teams/TeamsModal";
import TeamsList from "@components/tournaments/tournamentView/teams/TeamsList";
import NoTeamsAdded from "@components/tournaments/tournamentView/teams/NoTeamsAdded";

const TournamentTeamsPanel = ({ teams, matches }) => {
  const orderedAndChunked = chunk(orderBy(teams, "name"), 10);
  const [selectedTeam, setSelectedTeam] = useState(null);
  return (
    <>
      <Card
        title={
          <>
            <span>Teams ({teams.length})</span>
            {teams.length > 0 && (
              <Add
                message="Add a Team"
                className="float-end"
                onClick={() => setSelectedTeam({})}
              />
            )}
          </>
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
          onHide={() => setSelectedTeam(null)}
          onSelectTeam={setSelectedTeam}
          selectedTeam={selectedTeam}
          matches={matches}
        />
      )}
    </>
  );
};

export default TournamentTeamsPanel;

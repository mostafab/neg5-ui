import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import orderBy from "lodash/orderBy";
import chunk from "lodash/chunk";

import Card from "@components/common/cards";
import TeamsModal from "@components/tournaments/tournamentView/teams/TeamsModal";
import TeamsList from "@components/tournaments/tournamentView/teams/TeamsList";

const TournamentTeamsPanel = ({ teams }) => {
  const orderedAndChunked = chunk(orderBy(teams, "name"), 10);
  const [selectedTeam, setSelectedTeam] = useState(null);
  console.log(selectedTeam);
  return (
    <>
      <Card title={`Teams (${teams.length})`}>
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
        />
      )}
    </>
  );
};

export default TournamentTeamsPanel;

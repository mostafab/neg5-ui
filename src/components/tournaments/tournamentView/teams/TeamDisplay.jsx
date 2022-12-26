import React from "react";
import { Row, Col } from "react-bootstrap";

import Card from "@components/common/cards";

import TeamForm from "./TeamForm";
import TeamMatches from "./TeamMatches";

const TeamDisplay = ({ team, matches, teams }) => (
  <Card>
    <Row>
      <Col lg={team.id ? 6 : 12} md={12} sm={12}>
        <TeamForm team={team} />
      </Col>
      {team.id && (
        <Col lg={6} md={12} sm={12}>
          <TeamMatches team={team} matches={matches} teams={teams} />
        </Col>
      )}
    </Row>
  </Card>
);

export default TeamDisplay;

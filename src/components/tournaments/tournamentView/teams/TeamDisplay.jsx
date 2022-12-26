import React from "react";
import { Row, Col } from "react-bootstrap";

import Card from "@components/common/cards";

import TeamForm from "./TeamForm";
import TeamMatches from "./TeamMatches";

const TeamDisplay = ({ team, matches }) => (
  <Card>
    <Row>
      <Col lg={6} md={6} sm={12}>
        <TeamForm team={team} />
      </Col>
      {team.id && (
        <Col lg={6} md={6} sm={12}>
          <TeamMatches team={team} matches={matches} />
        </Col>
      )}
    </Row>
  </Card>
);

export default TeamDisplay;

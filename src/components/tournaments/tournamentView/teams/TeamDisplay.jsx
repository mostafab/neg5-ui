import React from "react";
import { Row, Col } from "react-bootstrap";

import Card from "@components/common/cards";

import TeamForm from "./TeamForm";

const TeamDisplay = ({ team }) => (
  <Row>
    <Col lg={6} md={6} sm={12}>
      <Card>
        <TeamForm team={team} />
      </Card>
    </Col>
    <Col lg={6} md={6} sm={12}></Col>
  </Row>
);

export default TeamDisplay;

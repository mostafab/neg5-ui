import React from "react";
import { Row, Col } from "react-bootstrap";

import Card from "@components/common/cards";

import TeamForm from "./TeamForm";

const TeamDisplay = ({ team }) => (
  <Card>
    <Row>
      <Col lg={6} md={6} sm={12}>
        <TeamForm team={team} />
      </Col>
      <Col lg={6} md={6} sm={12}></Col>
    </Row>
  </Card>
);

export default TeamDisplay;

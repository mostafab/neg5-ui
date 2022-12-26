import React from "react";
import { Row, Col } from "react-bootstrap";

import Modal from "@components/common/modal";
import Button from "@components/common/button";

import TeamsList from "./TeamsList";
import TeamDisplay from "./TeamDisplay";

const TeamsModal = ({
  matches,
  teams,
  selectedTeam,
  onHide,
  onSelectTeam,
  phases,
}) => (
  <Modal title="Teams" fullscreen onHide={onHide} className="TeamsModal">
    <Row>
      <Col lg={3} md={4} className="d-none d-md-block d-lg-block d-xl-block">
        <div className="d-grid">
          <Button type="outline-primary mb-3" onClick={() => onSelectTeam({})}>
            Add New Team
          </Button>
        </div>
        <TeamsList
          selectedTeam={selectedTeam}
          onSelectTeam={onSelectTeam}
          teams={teams}
        />
      </Col>
      <Col lg={9} md={8} sm={12}>
        <TeamDisplay team={selectedTeam} matches={matches} teams={teams} />
      </Col>
    </Row>
  </Modal>
);

export default TeamsModal;

import React from "react";
import { Row, Col } from "react-bootstrap";

import Modal from "@components/common/modal";
import Button from "@components/common/button";

import TeamsList from "./TeamsList";

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
      <Col lg={3} md={4} sm={0}>
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
      <Col lg={9} md={8} sm={12}></Col>
    </Row>
  </Modal>
);

export default TeamsModal;

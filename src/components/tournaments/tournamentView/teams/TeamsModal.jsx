import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import { Info } from "@components/common/alerts";
import Card from "@components/common/cards";
import Modal from "@components/common/modal";
import Button from "@components/common/button";

import TeamsList from "./TeamsList";
import TeamDisplay from "./TeamDisplay";
import TeamGroupForm from "./TeamGroupForm";

const TeamsModal = ({
  matches,
  teams,
  selectedTeam,
  onHide,
  onSelectTeam,
  editable,
}) => {
  const [addingGroup, setAddingGroup] = useState(false);
  useEffect(() => {
    setAddingGroup(false);
  }, [selectedTeam]);
  return (
    <Modal title="Teams" fullscreen onHide={onHide} className="TeamsModal">
      <Row>
        <Col lg={3} md={4} className="mb-3">
          {editable && (
            <div className="d-grid">
              <Button
                type="outline-primary"
                className="mb-3"
                onClick={() => onSelectTeam({})}
              >
                Add A New Team
              </Button>
              <Button
                type="outline-primary"
                className="mb-3"
                onClick={() => setAddingGroup(true)}
              >
                Add A Group
              </Button>
            </div>
          )}
          <TeamsList
            selectedTeam={addingGroup ? null : selectedTeam}
            onSelectTeam={onSelectTeam}
            teams={teams}
            shadow
          />
        </Col>
        <Col lg={9} md={8} sm={12}>
          {!addingGroup && (
            <TeamDisplay
              team={selectedTeam}
              matches={matches}
              teams={teams}
              onSubmitSuccess={onSelectTeam}
              onDeleteSuccess={() => onSelectTeam({})}
              editable={editable}
            />
          )}
          {addingGroup && (
            <Card title="Add a Team Group">
              <Info>
                Add a Team Group when you have multiple teams from the same
                school or organization participating in a tournament.
              </Info>
              <TeamGroupForm />
            </Card>
          )}
        </Col>
      </Row>
    </Modal>
  );
};

export default TeamsModal;

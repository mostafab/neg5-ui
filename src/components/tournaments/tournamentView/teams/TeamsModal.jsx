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
  const [addingTeam, setAddingTeam] = useState(!Boolean(selectedTeam?.id));
  useEffect(() => {
    if (selectedTeam?.id) {
      setAddingTeam(false);
    }
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
                onClick={() => setAddingTeam(true)}
              >
                Add A Team
              </Button>
            </div>
          )}
          <TeamsList
            selectedTeam={addingTeam ? null : selectedTeam}
            onSelectTeam={onSelectTeam}
            teams={teams}
            shadow
          />
        </Col>
        <Col lg={9} md={8} sm={12}>
          {!addingTeam && (
            <TeamDisplay
              team={selectedTeam}
              matches={matches}
              teams={teams}
              onSubmitSuccess={onSelectTeam}
              onDeleteSuccess={() => setAddingTeam(true)}
              editable={editable}
            />
          )}
          {addingTeam && (
            <Card title="Add a Team">
              <Info>
                You should add more than one roster if you have multiple teams
                from the same school or organization participating in a
                tournament.
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

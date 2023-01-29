import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import { Info } from "@components/common/alerts";
import Card from "@components/common/cards";
import Modal from "@components/common/modal";
import Button from "@components/common/button";

import TeamsList from "./TeamsList";
import TeamDisplay from "./TeamDisplay";
import TeamGroupForm from "./TeamGroupForm";
import TeamForm from "./TeamForm";

const ADD_MODES = {
  SINGLE: "s",
  MULTI: "m",
};

const TeamsModal = ({
  matches,
  teams,
  selectedTeam,
  onHide,
  onSelectTeam,
  editable,
  teamGroups,
}) => {
  const [addingTeam, setAddingTeam] = useState(!Boolean(selectedTeam?.id));
  const [addMode, setAddMode] = useState(ADD_MODES.MULTI);
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
                onClick={() => {
                  setAddingTeam(true);
                  onSelectTeam({});
                }}
              >
                Add A Team
              </Button>
            </div>
          )}
          <TeamsList
            selectedTeam={addingTeam ? null : selectedTeam}
            onSelectTeam={onSelectTeam}
            teams={teams}
            grouped
            teamGroups={teamGroups}
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
            <Card
              title={
                addMode === ADD_MODES.SINGLE
                  ? "Add Team"
                  : "Add an Organization"
              }
            >
              {addMode === ADD_MODES.MULTI && (
                <>
                  <div className="mb-3">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setAddMode(ADD_MODES.SINGLE);
                      }}
                    >
                      Or Add a New Team to an Existing Organization
                    </a>
                  </div>
                  <Info>
                    Add more than one roster if you have multiple teams from the
                    same school or organization participating in a tournament.
                  </Info>
                  <TeamGroupForm />
                </>
              )}
              {addMode === ADD_MODES.SINGLE && (
                <>
                  <div className="mb-3">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setAddMode(ADD_MODES.MULTI);
                      }}
                    >
                      Or Add an Organization / Multiple Rosters
                    </a>
                  </div>
                  <TeamForm team={{}} teamGroups={teamGroups} />
                </>
              )}
            </Card>
          )}
        </Col>
      </Row>
    </Modal>
  );
};

export default TeamsModal;

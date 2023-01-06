import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

import Modal from "@components/common/modal";
import Card from "@components/common/cards";
import Button from "@components/common/button";

import ScoresheetStartForm from "./ScoresheetStartForm";
import ScoresheetContainer from "./ScoresheetContainer";

const ScoresheetModal = ({ onHide, teams, rules, phases, currentUser }) => {
  const [scoresheetStartValues, setScoresheetStartValues] = useState(null);

  const getTitle = () => {
    if (!scoresheetStartValues) {
      return "Scoresheet";
    }
    const { team1Id, team2Id, round } = scoresheetStartValues;
    const teamVsString = [team1Id, team2Id]
      .map((teamId) => teams.find((t) => t.id === teamId).name)
      .join(" vs ");
    return `Round ${round}: ${teamVsString}`;
  };
  return (
    <Modal fullscreen title={getTitle()} onHide={onHide}>
      {!scoresheetStartValues && (
        <Row>
          <Col lg={4} md={3} />
          <Col lg={4} md={6}>
            <Card
              title="Fill out a few fields to get started."
              className="mt-lg-5 mt-md-5 mb-3"
            >
              <ScoresheetStartForm
                teams={teams}
                phases={phases}
                onSubmit={(values) => setScoresheetStartValues(values)}
                currentUser={currentUser}
              />
            </Card>
            <div style={{ textAlign: "center" }} className="d-flex">
              <Button className="w-100" type="secondary">
                Or load an existing scoresheet
              </Button>
            </div>
          </Col>
          <Col lg={4} md={3} />
        </Row>
      )}
      {scoresheetStartValues && (
        <ScoresheetContainer
          scoresheetStartValues={scoresheetStartValues}
          teams={teams}
          rules={rules}
          phases={phases}
        />
      )}
    </Modal>
  );
};

export default ScoresheetModal;

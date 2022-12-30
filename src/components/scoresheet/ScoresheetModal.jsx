import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

import Modal from "@components/common/modal";
import Card from "@components/common/cards";

import ScoresheetStartForm from "./ScoresheetStartForm";
import ScoresheetContainer from "./ScoresheetContainer";

const ScoresheetModal = ({ onHide, teams, rules, phases }) => {
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
              className="mt-lg-5 mt-md-5"
            >
              <ScoresheetStartForm
                teams={teams}
                phases={phases}
                onSubmit={(values) => setScoresheetStartValues(values)}
              />
            </Card>
          </Col>
          <Col lg={4} md={3} />
        </Row>
      )}
      {scoresheetStartValues && (
        <ScoresheetContainer
          scoresheetStartValues={scoresheetStartValues}
          teams={teams}
          rules={rules}
        />
      )}
    </Modal>
  );
};

export default ScoresheetModal;

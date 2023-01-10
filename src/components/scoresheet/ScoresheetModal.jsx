import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

import { useAppDispatch } from "@store";
import { doValidatedApiRequest } from "@api/common";
import { deleteScoresheet } from "@api/scoresheet";
import { scoresheetDeleted } from "@features/tournamentView/matchesSlice";

import Modal from "@components/common/modal";
import Card from "@components/common/cards";
import Button from "@components/common/button";

import ScoresheetStartForm from "./ScoresheetStartForm";
import ScoresheetContainer from "./ScoresheetContainer";
import ScoresheetsList from "./ScoresheetsList";

const ScoresheetModal = ({
  onHide,
  teams,
  rules,
  phases,
  scoresheets,
  currentUser,
  onViewCreatedMatch,
}) => {
  const [scoresheetStartValues, setScoresheetStartValues] = useState(null);
  const [showList, setShowList] = useState(false);
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
  const dispatch = useAppDispatch();

  const onSelectScoresheet = (scoresheet) => {
    setScoresheetStartValues(scoresheet);
  };

  const onDelete = async (scoresheet) => {
    const response = await doValidatedApiRequest(() =>
      deleteScoresheet(scoresheet.id)
    );
    if (!response.errors) {
      dispatch(scoresheetDeleted({ id: scoresheet.id }));
    }
  };

  const renderPrestartContent = () => {
    if (!showList) {
      return (
        <>
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
          {scoresheets.length > 0 && (
            <div style={{ textAlign: "center" }} className="d-flex">
              <Button
                className="w-100"
                type="secondary"
                onClick={() => setShowList(true)}
              >
                Or resume an in-progress scoresheet ({scoresheets.length})
              </Button>
            </div>
          )}
        </>
      );
    }
    return (
      <>
        <Button
          type="secondary"
          onClick={() => setShowList(false)}
          className="w-100 mt-lg-5 mt-md-5 mb-3"
        >
          Start a new scoresheet
        </Button>
        <ScoresheetsList
          scoresheets={scoresheets}
          teams={teams}
          currentUser={currentUser}
          onSelect={onSelectScoresheet}
          onDelete={onDelete}
        />
      </>
    );
  };
  return (
    <Modal fullscreen title={getTitle()} onHide={onHide}>
      {!scoresheetStartValues && (
        <Row>
          <Col lg={4} md={3} />
          <Col lg={4} md={6}>
            {renderPrestartContent()}
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
          onViewCreatedMatch={onViewCreatedMatch}
        />
      )}
    </Modal>
  );
};

export default ScoresheetModal;

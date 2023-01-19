import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";

import { useAppDispatch } from "@store";
import { doValidatedApiRequest } from "@api/common";
import { deleteScoresheet } from "@api/scoresheet";
import { scoresheetDeleted } from "@features/tournamentView/matchesSlice";

import Modal from "@components/common/modal";
import Card from "@components/common/cards";
import Button from "@components/common/button";

import { TournamentLiveChangesContext } from "@components/tournaments/common/context";
import ScheduledMatches from "@components/scheduling/ScheduledMatches";

import { ScoresheetState } from "@libs/enums";
import { Events } from "@libs/liveEvents";

import ScoresheetStartForm from "./ScoresheetStartForm";
import ScoresheetContainer from "./ScoresheetContainer";
import ScoresheetsList from "./ScoresheetsList";

const PreStartStage = {
  ScoresheetsList: "scoresheets",
  Form: "form",
  Schedule: "schedule",
};

const ScoresheetModal = ({
  onHide,
  teams,
  rules,
  phases,
  scoresheets,
  currentUser,
  onViewCreatedMatch,
  scheduledMatches,
  schedules,
}) => {
  const [scoresheetStartValues, setScoresheetStartValues] = useState(null);
  const [startFormSeedValues, setStartFormSeedValues] = useState(null);
  const [prestartStage, setPrestartStage] = useState(() => {
    const draftScoresheetsForUser = scoresheets.filter(
      (s) =>
        s.status === ScoresheetState.Draft &&
        s.addedBy === currentUser?.username
    ).length;
    if (draftScoresheetsForUser > 0) {
      return PreStartStage.ScoresheetsList;
    }
    return scheduledMatches.length > 0
      ? PreStartStage.Schedule
      : PreStartStage.Form;
  });
  useEffect(() => {
    setStartFormSeedValues(null);
  }, [prestartStage]);
  const liveChangesContext = useContext(TournamentLiveChangesContext);
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

  const onSelectScheduledMatch = ({
    round,
    room,
    team1Id,
    team2Id,
    scheduleId,
  }) => {
    const phaseId = schedules.find(
      (s) => s.id === scheduleId
    )?.tournamentPhaseId;
    setStartFormSeedValues({
      round,
      team1Id,
      team2Id,
      room,
      phases: phaseId ? [phaseId] : [],
    });
    setPrestartStage(PreStartStage.Form);
  };

  const onDelete = async (scoresheet) => {
    const response = await doValidatedApiRequest(() =>
      deleteScoresheet(scoresheet.id)
    );
    if (!response.errors) {
      dispatch(scoresheetDeleted({ id: scoresheet.id }));
      liveChangesContext.trigger(Events.scoresheet.deleted, {
        id: scoresheet.id,
      });
    }
  };

  const renderResumeScoresheetButton = () => {
    if (scoresheets.length === 0) {
      return null;
    }
    return (
      <div style={{ textAlign: "center" }} className="d-flex">
        <Button
          className="w-100 mt-lg-5 mt-md-5"
          type="secondary"
          onClick={() => setPrestartStage(PreStartStage.ScoresheetsList)}
        >
          Resume an in-progress scoresheet ({scoresheets.length})
        </Button>
      </div>
    );
  };

  const renderPrestartContent = () => {
    switch (prestartStage) {
      case PreStartStage.Form:
        return (
          <>
            {renderResumeScoresheetButton()}
            <Card
              title="Fill out a few fields to get started."
              className="mt-4 mb-3"
            >
              {scheduledMatches.length > 0 && (
                <div className="mb-3">
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setPrestartStage(PreStartStage.Schedule);
                    }}
                  >
                    Or start a scheduled match
                  </a>
                </div>
              )}
              <ScoresheetStartForm
                teams={teams}
                phases={phases}
                onSubmit={(values) => setScoresheetStartValues(values)}
                currentUser={currentUser}
                seedValues={startFormSeedValues}
              />
            </Card>
          </>
        );
      case PreStartStage.ScoresheetsList:
        return (
          <>
            <Button
              type="secondary"
              onClick={() => setPrestartStage(PreStartStage.Form)}
              className="w-100 mt-lg-5 mt-md-5 mb-3"
            >
              Start a new scoresheet
            </Button>
            {scheduledMatches.length > 0 && (
              <Button
                type="secondary"
                onClick={() => setPrestartStage(PreStartStage.Schedule)}
                className="w-100 mb-3"
              >
                View Scheduled Matches
              </Button>
            )}
            {scoresheets.length > 0 && <h5>In-progress scoresheets</h5>}
            <ScoresheetsList
              scoresheets={scoresheets}
              teams={teams}
              currentUser={currentUser}
              onSelect={onSelectScoresheet}
              onDelete={onDelete}
              selectable={(s) => s.addedBy === currentUser.username}
            />
          </>
        );
      case PreStartStage.Schedule:
        return (
          <>
            {renderResumeScoresheetButton()}
            <Card
              title="Start a scheduled match"
              shadow={false}
              className="mt-4"
            >
              <div className="mb-3">
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    setPrestartStage(PreStartStage.Form);
                  }}
                >
                  Or start a scoresheet from scratch
                </a>
              </div>
              <div>
                <ScheduledMatches
                  teams={teams}
                  matches={scheduledMatches}
                  onSelect={onSelectScheduledMatch}
                />
              </div>
            </Card>
          </>
        );
    }
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

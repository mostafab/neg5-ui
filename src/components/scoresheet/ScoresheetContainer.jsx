import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import produce from "immer";

import { CycleStage } from "@libs/enums";
import CurrentCyclePanel from "./CurrentCyclePanel";

const scoresheetInitialState = () => ({
  currentCycle: {
    number: 1,
    answers: [],
    stage: CycleStage.Tossup,
    bonuses: [],
  },
  cycles: [],
});

const ScoresheetContainer = ({ scoresheetStartValues, teams, rules }) => {
  const [scoresheetState, setScoresheetState] = useState(
    scoresheetInitialState()
  );
  const scoresheetTeams = [
    scoresheetStartValues.team1Id,
    scoresheetStartValues.team2Id,
  ].map((teamId) => teams.find((t) => t.id === teamId));

  const onClickBack = () => {
    const nextState = produce(scoresheetState, (draft) => {
      const { stage } = draft.currentCycle;
      // If user clicks "Back" on a bonus, remove the most recent answer and reset to tossup stage
      if (stage === CycleStage.Bonus) {
        draft.currentCycle.stage = CycleStage.Tossup;
        draft.currentCycle.answers.pop();
      }
    });
    setScoresheetState(nextState);
  };

  const onClickAnswer = ({ playerId, value }) => {
    const currentCycleNextState = {
      ...scoresheetState.currentCycle,
      answers: [...scoresheetState.currentCycle.answers, { playerId, value }],
      stage: CycleStage.Bonus,
    };
    setScoresheetState({
      ...scoresheetState,
      currentCycle: currentCycleNextState,
    });
  };
  console.log(scoresheetState);
  return (
    <Row>
      <Col lg={6} md={6} sm={12}></Col>
      <Col lg={6} md={6} sm={12}>
        <CurrentCyclePanel
          currentCycle={scoresheetState.currentCycle}
          teams={scoresheetTeams}
          rules={rules}
          onClickAnswer={onClickAnswer}
          onClickBack={onClickBack}
        />
      </Col>
    </Row>
  );
};

export default ScoresheetContainer;

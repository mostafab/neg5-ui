import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import produce from "immer";
import times from "lodash/times";

import { CycleStage } from "@libs/enums";
import CurrentCyclePanel from "./CurrentCyclePanel";

const initialCurrentCycle = (partsPerBonus) => ({
  number: 1,
  answers: [],
  stage: CycleStage.Tossup,
  bonuses: times(partsPerBonus, () => ({
    answeringTeamId: null,
  })),
});

const scoresheetInitialState = (rules) => {
  return {
    currentCycle: initialCurrentCycle(rules.partsPerBonus),
    cycles: [],
  };
};

const ScoresheetContainer = ({ scoresheetStartValues, teams, rules }) => {
  const [scoresheetState, setScoresheetState] = useState(
    scoresheetInitialState(rules)
  );
  const scoresheetTeams = [
    scoresheetStartValues.team1Id,
    scoresheetStartValues.team2Id,
  ].map((teamId) => teams.find((t) => t.id === teamId));

  const onBack = () => {
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

  const onBonus = (teamId, bonusIndex) => {
    const nextState = produce(scoresheetState, (draft) => {
      draft.currentCycle.bonuses[bonusIndex].answeringTeamId =
        teamId === draft.currentCycle.bonuses[bonusIndex].answeringTeamId
          ? null
          : teamId;
    });
    setScoresheetState(nextState);
  };

  const onNextTossup = () => {
    const nextState = produce(scoresheetState, (draft) => {
      draft.cycles.push(draft.currentCycle);
      const nextCycle = initialCurrentCycle(rules.partsPerBonus);
      nextCycle.number = draft.currentCycle.number + 1;
      draft.currentCycle = nextCycle;
    });
    setScoresheetState(nextState);
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
          onBack={onBack}
          onBonus={onBonus}
          onNextTossup={onNextTossup}
        />
      </Col>
    </Row>
  );
};

export default ScoresheetContainer;

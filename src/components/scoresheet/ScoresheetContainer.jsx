import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import produce from "immer";
import times from "lodash/times";
import keyBy from "lodash/keyBy";
import mapValues from "lodash/mapValues";

import { CycleStage } from "@libs/enums";
import CurrentCyclePanel from "./CurrentCyclePanel";

const initialCurrentCycle = (rules) => ({
  number: 1,
  answers: [],
  stage: CycleStage.Tossup,
  bonuses: times(rules.partsPerBonus, () => ({
    answeringTeamId: null,
    value: rules.bonusPointValue,
  })),
});

const scoresheetInitialState = (rules) => {
  return {
    currentCycle: initialCurrentCycle(rules),
    cycles: [],
  };
};

const recalculateScoringData = (scoresheetState, teams) => {
  const playerTeamIds = mapValues(
    keyBy(
      teams.flatMap((t) => t.players),
      "id"
    ),
    (v) => v.teamId
  );
  const result = {
    teams: {},
  };
  teams.forEach((t) => {
    result.teams[t.id] = {};
    result.teams[t.id].score = 0;
  });
  scoresheetState.cycles.forEach(({ answers, bonuses }) => {
    answers.forEach(({ playerId, value }) => {
      const teamId = playerTeamIds[playerId];
      result.teams[teamId].score += value;
    });
    bonuses
      .filter((b) => b.answeringTeamId)
      .forEach(({ answeringTeamId, value }) => {
        result.teams[answeringTeamId].score += value;
      });
  });
  return result;
};

const ScoresheetContainer = ({ scoresheetStartValues, teams, rules }) => {
  const [scoresheetState, setScoresheetState] = useState(
    scoresheetInitialState(rules)
  );
  const scoresheetTeams = [
    scoresheetStartValues.team1Id,
    scoresheetStartValues.team2Id,
  ].map((teamId) => teams.find((t) => t.id === teamId));
  const [scoringData, setScoringData] = useState({});
  useEffect(() => {
    setScoringData(recalculateScoringData(scoresheetState, scoresheetTeams));
  }, [scoresheetState]);

  const onBack = () => {
    const nextState = produce(scoresheetState, (draft) => {
      const { stage } = draft.currentCycle;
      // If user clicks "Back" on a bonus, remove the most recent answer and reset to tossup stage
      if (stage === CycleStage.Bonus) {
        draft.currentCycle.stage = CycleStage.Tossup;
        draft.currentCycle.answers.pop();
      } else {
        draft.currentCycle = draft.cycles.pop();
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

  const onNoAnswer = () => {
    const nextState = produce(scoresheetState, (draft) => {
      // Clear out bonuses since this tossup wasn't answered successfully.
      draft.currentCycle.bonuses = [];
      draft.cycles.push(draft.currentCycle);
      const nextCycle = initialCurrentCycle(rules.partsPerBonus);
      nextCycle.number = draft.currentCycle.number + 1;
      draft.currentCycle = nextCycle;
    });
    setScoresheetState(nextState);
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
      const nextCycle = initialCurrentCycle(rules);
      nextCycle.number = draft.currentCycle.number + 1;
      draft.currentCycle = nextCycle;
    });
    setScoresheetState(nextState);
  };
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
          onNoAnswer={onNoAnswer}
          scoringData={scoringData}
        />
      </Col>
    </Row>
  );
};

export default ScoresheetContainer;

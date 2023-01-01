import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import produce from "immer";
import times from "lodash/times";
import groupBy from "lodash/groupBy";
import mapValues from "lodash/mapValues";

import { CycleStage, AnswerType, Direction } from "@libs/enums";
import CurrentCyclePanel from "./CurrentCyclePanel";
import ScoresheetTable from "./ScoresheetTable";

const initialBonuses = (rules) =>
  times(rules.partsPerBonus, () => ({
    answeringTeamId: null,
    value: rules.bonusPointValue,
  }));

const initialCurrentCycle = (rules) => ({
  number: 1,
  answers: [],
  stage: CycleStage.Tossup,
  bonuses: initialBonuses(rules),
  activePlayers: [],
});

const scoresheetInitialState = (rules, teams) => {
  const playersByTeamId = groupBy(
    teams.flatMap((t) => t.players),
    "teamId"
  );
  const playerOrderings = mapValues(playersByTeamId, (players) =>
    players.map((p) => p.id)
  );
  const activePlayersByTeamId = mapValues(playersByTeamId, (players) =>
    players.slice(0, rules.maxActivePlayersPerTeam).map((p) => p.id)
  );
  return {
    currentCycle: initialCurrentCycle(rules),
    cycles: [],
    playerOrderings,
    activePlayers: activePlayersByTeamId,
  };
};

const ScoresheetContainer = ({ scoresheetStartValues, teams, rules }) => {
  const scoresheetTeams = [
    scoresheetStartValues.team1Id,
    scoresheetStartValues.team2Id,
  ].map((teamId) => teams.find((t) => t.id === teamId));
  const [scoresheetState, setScoresheetState] = useState(
    scoresheetInitialState(rules, scoresheetTeams)
  );

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
    const isNeg =
      rules.tossupValues.find((tv) => tv.value === value).answerType ===
      AnswerType.Neg;
    const currentCycleNextState = {
      ...scoresheetState.currentCycle,
      answers: [...scoresheetState.currentCycle.answers, { playerId, value }],
      stage: isNeg ? CycleStage.Tossup : CycleStage.Bonus,
    };
    setScoresheetState({
      ...scoresheetState,
      currentCycle: currentCycleNextState,
    });
  };

  const onNoAnswer = () => {
    const nextState = produce(scoresheetState, (draft) => {
      // Clear out bonuses since this tossup wasn't answered successfully.
      draft.currentCycle.bonuses = initialBonuses(rules);
      draft.currentCycle.activePlayers = Object.values(
        draft.activePlayers
      ).flatMap((p) => p);
      draft.cycles.push(draft.currentCycle);
      const nextCycle = initialCurrentCycle(rules);
      nextCycle.number = draft.currentCycle.number + 1;
      draft.currentCycle = nextCycle;
    });
    setScoresheetState(nextState);
  };

  const onUndoNeg = (teamId) => {
    const negValues = new Set(
      rules.tossupValues
        .filter((tv) => tv.answerType === AnswerType.Neg)
        .map((tv) => tv.value)
    );
    const playerIds = new Set(
      scoresheetTeams
        .flatMap((t) => t.players)
        .filter((p) => p.teamId === teamId)
        .map((p) => p.id)
    );
    const nextState = produce(scoresheetState, (draft) => {
      // Remove the neg by this team
      draft.currentCycle.answers = draft.currentCycle.answers.filter(
        (a) => !(negValues.has(a.value) && playerIds.has(a.playerId))
      );
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
      draft.currentCycle.activePlayers = Object.values(
        draft.activePlayers
      ).flatMap((p) => p);
      draft.cycles.push(draft.currentCycle);
      const nextCycle = initialCurrentCycle(rules);
      nextCycle.number = draft.currentCycle.number + 1;
      draft.currentCycle = nextCycle;
    });
    setScoresheetState(nextState);
  };

  const onMovePlayer = ({ teamId, index, direction }) => {
    const nextState = produce(scoresheetState, (draft) => {
      const orderings = draft.playerOrderings[teamId];
      let targetIndex;
      if (index === 0 && direction === Direction.Up) {
        targetIndex = orderings.length - 1;
      } else if (
        index === orderings.length - 1 &&
        direction === Direction.Down
      ) {
        targetIndex = 0;
      } else {
        targetIndex = index + (direction === Direction.Down ? 1 : -1);
      }
      const current = orderings[index];
      orderings[index] = orderings[targetIndex];
      orderings[targetIndex] = current;

      draft.playerOrderings[teamId] = orderings;
    });
    setScoresheetState(nextState);
  };
  return (
    <Row>
      <Col
        lg={7}
        md={6}
        sm={12}
        className="order-1 order-lg-0 order-md-0 order-xl-0"
      >
        <ScoresheetTable
          currentCycle={scoresheetState.currentCycle}
          cycles={scoresheetState.cycles}
          teams={scoresheetTeams}
          rules={rules}
          playerOrderings={scoresheetState.playerOrderings}
          className="sticky-top"
        />
      </Col>
      <Col
        lg={5}
        md={6}
        sm={12}
        className="order-0 order-lg-1 order-md-1 order-xl-1 mb-sm-3"
      >
        <CurrentCyclePanel
          currentCycle={scoresheetState.currentCycle}
          teams={scoresheetTeams}
          rules={rules}
          onClickAnswer={onClickAnswer}
          onBack={onBack}
          onBonus={onBonus}
          onNextTossup={onNextTossup}
          onNoAnswer={onNoAnswer}
          onUndoNeg={onUndoNeg}
          playerOrderings={scoresheetState.playerOrderings}
          onMovePlayer={onMovePlayer}
          activePlayers={scoresheetState.activePlayers}
        />
      </Col>
    </Row>
  );
};

export default ScoresheetContainer;

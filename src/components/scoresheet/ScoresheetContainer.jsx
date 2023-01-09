import React, { useState, useContext, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import produce from "immer";
import times from "lodash/times";
import groupBy from "lodash/groupBy";
import mapValues from "lodash/mapValues";

import { useAppDispatch } from "@store";
import { scoresheetCreatedOrUpdated } from "@features/tournamentView/matchesSlice";
import { doValidatedApiRequest } from "@api/common";
import { createOrUpdateDraft } from "@api/scoresheet";
import { CycleStage, AnswerType, Direction } from "@libs/enums";
import { TournamentIdContext } from "@components/tournaments/common/context";

import CurrentCyclePanel from "./CurrentCyclePanel";
import ScoresheetTable from "./ScoresheetTable";
import ScoresheetSummary from "./ScoresheetSummary";
import ScoresheetSubmissionPanel from "./ScoresheetSubmissionPanel";

const initialBonuses = (rules) =>
  times(rules.partsPerBonus, (index) => ({
    answeringTeamId: null,
    value: rules.bonusPointValue,
    number: index + 1,
  }));

const initialCurrentCycle = (rules) => ({
  number: 1,
  answers: [],
  stage: CycleStage.Tossup,
  bonuses: initialBonuses(rules),
  activePlayers: [],
});

const scoresheetInitialState = (rules, teams, tournamentId, startValues) => {
  const playersByTeamId = groupBy(
    teams.flatMap((t) => t.players),
    "teamId"
  );
  const playerOrderings = mapValues(playersByTeamId, (players) =>
    players.map((p) => p.id)
  );
  const activePlayers = Object.values(
    mapValues(playersByTeamId, (players) =>
      players.slice(0, rules.maxActivePlayersPerTeam).map((p) => p.id)
    )
  ).flatMap((playerIds) => playerIds);
  const state = {
    currentCycle: initialCurrentCycle(rules),
    cycles: [],
    playerOrderings,
    activePlayers: activePlayers,
    tournamentId,
    ...startValues,
  };
  if (startValues.cycles) {
    state.currentCycle.number = startValues.cycles.length + 1;
  }
  return state;
};

const ScoresheetContainer = ({
  scoresheetStartValues,
  teams,
  rules,
  phases,
  onViewCreatedMatch,
}) => {
  const tournamentId = useContext(TournamentIdContext);
  const scoresheetTeams = [
    scoresheetStartValues.team1Id,
    scoresheetStartValues.team2Id,
  ].map((teamId) => teams.find((t) => t.id === teamId));
  const [scoresheetState, setScoresheetState] = useState(() =>
    scoresheetInitialState(
      rules,
      scoresheetTeams,
      tournamentId,
      scoresheetStartValues
    )
  );
  const [endingMatch, setEndingMatch] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (scoresheetState.cycles.length > 0) {
      createOrUpdateDraftScoresheet();
    }
  }, [scoresheetState.cycles.length]);

  const onEndMatch = () => {
    setEndingMatch(true);
  };

  const createOrUpdateDraftScoresheet = async () => {
    const payload = {
      ...scoresheetStartValues,
      ...scoresheetState,
    };
    const response = await doValidatedApiRequest(() =>
      createOrUpdateDraft(payload)
    );
    if (!response.errors) {
      setScoresheetState({
        ...scoresheetState,
        id: response.id,
        addedBy: response.addedBy,
        addedAt: response.addedAt,
        lastUpdatedAt: response.lastUpdatedAt,
      });
      dispatch(scoresheetCreatedOrUpdated(response));
    }
  };

  const onBack = () => {
    const nextState = produce(scoresheetState, (draft) => {
      const { stage } = draft.currentCycle;
      // If user clicks "Back" on a bonus, remove the most recent answer and reset to tossup stage
      if (stage === CycleStage.Bonus) {
        draft.currentCycle.stage = CycleStage.Tossup;
        draft.currentCycle.answers.pop();
        draft.currentCycle.bonuses = initialBonuses(rules);
      } else {
        draft.currentCycle = draft.cycles.pop();
        draft.currentCycle.activePlayers = [];
      }
    });
    setScoresheetState(nextState);
  };

  const onClickAnswer = ({ playerId, value }) => {
    const isNeg =
      rules.tossupValues.find((tv) => tv.value === value).answerType ===
      AnswerType.Neg;
    const answerNumber = scoresheetState.currentCycle.answers.length + 1;
    const currentCycleNextState = {
      ...scoresheetState.currentCycle,
      answers: [
        ...scoresheetState.currentCycle.answers,
        { playerId, value, number: answerNumber },
      ],
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

  const onBonus = (teamId, number) => {
    const nextState = produce(scoresheetState, (draft) => {
      const match = draft.currentCycle.bonuses.find((b) => b.number === number);
      match.answeringTeamId = teamId === match.answeringTeamId ? null : teamId;
    });
    setScoresheetState(nextState);
  };

  const onNextTossup = () => {
    const nextState = produce(scoresheetState, (draft) => {
      draft.currentCycle.activePlayers = draft.activePlayers;
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

  const onToggleActivePlayer = ({ id }) => {
    const nextState = produce(scoresheetState, (draft) => {
      const index = draft.activePlayers.findIndex(
        (playerId) => playerId === id
      );
      if (index === -1) {
        draft.activePlayers.push(id);
      } else {
        draft.activePlayers = draft.activePlayers.filter(
          (playerId) => playerId !== id
        );
      }
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
        <Row>
          <Col lg={12} md={12} sm={12} className="mb-3">
            <ScoresheetTable
              currentCycle={scoresheetState.currentCycle}
              cycles={scoresheetState.cycles}
              teams={scoresheetTeams}
              rules={rules}
              playerOrderings={scoresheetState.playerOrderings}
              className="sticky-top"
            />
          </Col>
          <Col lg={12} md={12} sm={12}>
            <ScoresheetSummary
              cycles={scoresheetState.cycles}
              teams={scoresheetTeams}
              currentCycle={scoresheetState.currentCycle}
              rules={rules}
              playerOrderings={scoresheetState.playerOrderings}
            />
          </Col>
        </Row>
      </Col>
      <Col
        lg={5}
        md={6}
        sm={12}
        className="order-0 order-lg-1 order-md-1 order-xl-1 mb-3"
      >
        {!endingMatch && (
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
            onToggleActive={onToggleActivePlayer}
            onEndMatch={onEndMatch}
            lastUpdatedAt={scoresheetState.lastUpdatedAt}
          />
        )}
        {endingMatch && (
          <ScoresheetSubmissionPanel
            scoresheetState={scoresheetState}
            startValues={scoresheetStartValues}
            onCancel={() => setEndingMatch(false)}
            teams={scoresheetTeams}
            rules={rules}
            phases={phases}
            onViewCreatedMatch={onViewCreatedMatch}
          />
        )}
      </Col>
    </Row>
  );
};

export default ScoresheetContainer;

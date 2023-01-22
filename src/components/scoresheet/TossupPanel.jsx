import React from "react";
import { Row, Col } from "react-bootstrap";

import { AnswerType } from "@libs/enums";
import Button from "@components/common/button";
import { Info } from "@components/common/alerts";

import TeamCard from "./TeamCard";

const teamIsLockedOut = (currentCycle, team, rules) => {
  if (currentCycle.answers.length === 0) {
    return false;
  }
  const negValues = new Set(
    rules.tossupValues
      .filter((tv) => tv.answerType === AnswerType.Neg)
      .map((tv) => tv.value)
  );
  return team.players.some((p) => {
    const answers = currentCycle.answers;
    return answers.some((a) => a.playerId === p.id && negValues.has(a.value));
  });
};

const TossupPanel = ({
  teams,
  rules,
  onClickAnswer,
  currentCycle,
  onBack,
  onNoAnswer,
  onUndoNeg,
  playerOrderings,
  onMovePlayer,
  activePlayers,
  onToggleActive,
  onEndMatch = null,
}) => (
  <>
    <Row className="mb-3">
      {currentCycle.number === 1 && (
        <Col lg={12} md={12} sm={12}>
          <Info>Remember to set the players participating in this match.</Info>
        </Col>
      )}
      {teams.map((team) => (
        <Col lg={6} md={6} sm={6} xs={6} key={team.id}>
          <TeamCard
            team={team}
            rules={rules}
            onClickAnswer={onClickAnswer}
            lockedOut={teamIsLockedOut(currentCycle, team, rules)}
            onUndoNeg={onUndoNeg}
            playerOrderings={playerOrderings[team.id]}
            onMovePlayer={onMovePlayer}
            activePlayers={activePlayers.filter((playerId) => {
              return team.players.some((p) => p.id === playerId);
            })}
            onToggleActive={onToggleActive}
          />
        </Col>
      ))}
    </Row>
    <hr />
    <Row className="mb-3">
      <Col lg={12} md={12} sm={12} className="d-flex justify-content-between">
        {currentCycle.number > 1 && (
          <Button type="outline-secondary" onClick={onBack}>
            Back
          </Button>
        )}
        <Button type="outline-secondary" onClick={onNoAnswer}>
          Dead Tossup
        </Button>
      </Col>
    </Row>
    {currentCycle.number > 1 && onEndMatch && (
      <Row>
        <Col lg={12}>
          <Button className="float-end" onClick={onEndMatch}>
            End Match
          </Button>
        </Col>
      </Row>
    )}
  </>
);

export default TossupPanel;

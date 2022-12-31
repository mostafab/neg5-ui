import React from "react";
import { Row, Col, InputGroup } from "react-bootstrap";

import { answerTypeToPillType } from "@libs/tournamentForms";
import { AnswerType, Direction } from "@libs/enums";
import { orderPlayers } from "@libs/scoresheet";
import Card from "@components/common/cards";
import Button from "@components/common/button";
import Icon from "@components/common/icon";

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

const TeamCard = ({
  team,
  rules,
  onClickAnswer,
  score,
  lockedOut,
  onUndoNeg,
  onMovePlayer,
  playerOrderings,
}) => (
  <Card title={`${team.name} (${score})`} shadow={false}>
    {lockedOut && (
      <Button onClick={() => onUndoNeg(team.id)} type="danger">
        Undo Neg
      </Button>
    )}
    {!lockedOut &&
      orderPlayers(team.players, playerOrderings).map((player, index) => (
        <InputGroup className="mb-3" key={player.id}>
          <InputGroup.Text className="w-100 overflow-auto d-flex justify-content-between">
            <span className="overflow-auto">{player.name}</span>
            <span
              className="position-absolute p-2 text-bg-primary small"
              style={{ right: "0", zIndex: 2 }}
            >
              <Icon
                name="ArrowUp"
                className="me-2"
                onClick={() =>
                  onMovePlayer({
                    teamId: team.id,
                    index,
                    direction: Direction.Up,
                  })
                }
              />
              <Icon
                name="ArrowDown"
                onClick={() =>
                  onMovePlayer({
                    teamId: team.id,
                    index,
                    direction: Direction.Down,
                  })
                }
              />
            </span>
          </InputGroup.Text>
          {rules.tossupValues.map((tv) => (
            <Button
              type={answerTypeToPillType[tv.answerType]}
              key={tv.value}
              className={rules.tossupValues.length >= 3 ? "btn-sm" : ""}
              onClick={() =>
                onClickAnswer({ playerId: player.id, value: tv.value })
              }
            >
              {tv.value}
            </Button>
          ))}
        </InputGroup>
      ))}
  </Card>
);

const TossupPanel = ({
  teams,
  rules,
  onClickAnswer,
  currentCycle,
  onBack,
  onNoAnswer,
  scoringData,
  onUndoNeg,
  playerOrderings,
  onMovePlayer,
}) => (
  <>
    <Row className="mb-3">
      {teams.map((team) => (
        <Col lg={6} md={6} sm={6} xs={6} key={team.id}>
          <TeamCard
            score={scoringData.teams?.[team.id]?.score || 0}
            team={team}
            rules={rules}
            onClickAnswer={onClickAnswer}
            lockedOut={teamIsLockedOut(currentCycle, team, rules)}
            onUndoNeg={onUndoNeg}
            playerOrderings={playerOrderings[team.id]}
            onMovePlayer={onMovePlayer}
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
        <Button type="outline-primary" onClick={onNoAnswer}>
          Dead Tossup
        </Button>
      </Col>
    </Row>
    {currentCycle.number > 1 && (
      <Row>
        <Col lg={12}>
          <Button className="float-end">End Match</Button>
        </Col>
      </Row>
    )}
  </>
);

export default TossupPanel;

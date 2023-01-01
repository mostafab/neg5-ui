import React from "react";
import { Row, Col, InputGroup } from "react-bootstrap";

import { answerTypeToPillType } from "@libs/tournamentForms";
import { AnswerType, Direction } from "@libs/enums";
import { orderPlayers } from "@libs/scoresheet";
import Card from "@components/common/cards";
import Button from "@components/common/button";
import DropdownActions from "@components/common/DropdownActions";

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
  lockedOut,
  onUndoNeg,
  onMovePlayer,
  playerOrderings,
  activePlayers,
  onToggleActive,
}) => (
  <Card
    title={<span className={lockedOut ? "text-dark" : ""}>{team.name}</span>}
    shadow={false}
  >
    {lockedOut && (
      <Button
        className="d-block w-100"
        onClick={() => onUndoNeg(team.id)}
        type="danger"
      >
        Undo Neg
      </Button>
    )}
    {!lockedOut &&
      orderPlayers(team.players, playerOrderings).map((player, index) => {
        const isActive = activePlayers.indexOf(player.id) >= 0;
        const actions = [
          {
            label: isActive ? "Mark inactive" : "Mark active",
            onClick: () => onToggleActive(player),
          },
        ];
        if (team.players.length > 1) {
          actions.unshift(
            {
              label: "Move up",
              onClick: () =>
                onMovePlayer({
                  teamId: team.id,
                  index,
                  direction: Direction.Up,
                }),
            },
            {
              label: "Move down",
              onClick: () =>
                onMovePlayer({
                  teamId: team.id,
                  index,
                  direction: Direction.Down,
                }),
            }
          );
        }
        const dropdownActions = <DropdownActions actions={actions} />;
        return (
          <InputGroup className="mb-3" key={player.id}>
            <InputGroup.Text className="w-100 overflow-auto d-flex justify-content-between">
              <span className="overflow-auto">{player.name}</span>
              {dropdownActions}
            </InputGroup.Text>
            {isActive &&
              rules.tossupValues.map((tv) => (
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
        );
      })}
  </Card>
);

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
}) => (
  <>
    <Row className="mb-3">
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
            activePlayers={activePlayers[team.id]}
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

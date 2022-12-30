import React from "react";
import { Row, Col, InputGroup, ButtonGroup } from "react-bootstrap";

import Button from "@components/common/button";
import Card from "@components/common/cards";
import { CycleStage } from "@libs/enums";
import { answerTypeToPillType } from "@libs/tournamentForms";

const BonusPanel = ({
  rules,
  teams,
  onBack,
  currentCycle,
  onBonus,
  onNextTossup,
}) => {
  const { bonusPointValue, usesBouncebacks = false } = rules;
  const answeringPlayerId =
    currentCycle.answers[currentCycle.answers.length - 1].playerId;
  const answeringTeamId = teams.find((t) =>
    t.players.some((p) => p.id === answeringPlayerId)
  ).id;
  return (
    <>
      <Row className="mb-3">
        {currentCycle.bonuses.map((bonus, index) => (
          <Col
            lg={12}
            key={index}
            className="mb-3 d-flex justify-content-between"
          >
            <div className="p-2">Part {index + 1}</div>
            <ButtonGroup>
              {teams
                .filter((t) => usesBouncebacks || t.id === answeringTeamId)
                .map((team) => (
                  <Button
                    key={team.id}
                    type={
                      team.id === bonus.answeringTeamId
                        ? "success"
                        : "outline-secondary"
                    }
                    onClick={() => onBonus(team.id, index)}
                  >
                    +{bonusPointValue} for {team.name}
                  </Button>
                ))}
            </ButtonGroup>
          </Col>
        ))}
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12} className="d-flex justify-content-between">
          <Button type="secondary" onClick={onBack}>
            Back
          </Button>
          <Button type="primary" onClick={onNextTossup}>
            Next Tossup
          </Button>
        </Col>
      </Row>
    </>
  );
};

const TeamCard = ({ team, rules, onClickAnswer }) => (
  <Card title={team.name} shadow={false}>
    {team.players.map((player) => (
      <InputGroup className="mb-3" key={player.id}>
        <InputGroup.Text className="w-100">{player.name}</InputGroup.Text>
        {rules.tossupValues.map((tv) => (
          <Button
            type={answerTypeToPillType[tv.answerType]}
            key={tv.value}
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

const CurrentCyclePanel = ({
  teams,
  currentCycle,
  rules,
  onClickAnswer,
  onBack,
  onBonus,
  onNextTossup,
}) => {
  const title = `${
    currentCycle.stage === CycleStage.Tossup ? "Tossup" : "Bonus"
  } ${currentCycle.number}`;
  return (
    <Card title={title}>
      {currentCycle.stage === CycleStage.Tossup && (
        <Row>
          {teams.map((team) => (
            <Col lg={6} md={6} sm={12} key={team.id}>
              <TeamCard
                team={team}
                rules={rules}
                onClickAnswer={onClickAnswer}
              />
            </Col>
          ))}
        </Row>
      )}
      {currentCycle.stage === CycleStage.Bonus && (
        <BonusPanel
          rules={rules}
          teams={teams}
          onBack={onBack}
          currentCycle={currentCycle}
          onBonus={onBonus}
          onNextTossup={onNextTossup}
        />
      )}
    </Card>
  );
};

export default CurrentCyclePanel;

import React, { useState } from "react";
import { Row, Col, InputGroup } from "react-bootstrap";
import times from "lodash/times";
import produce from "immer";

import Button from "@components/common/button";
import Card from "@components/common/cards";
import { CycleStage } from "@libs/enums";
import { answerTypeToPillType } from "@libs/tournamentForms";

const BonusPanel = ({ rules, teams, onClickBack, currentCycle }) => {
  const { partsPerBonus, bonusPointValue, usesBouncebacks = false } = rules;
  const initialBonusesArray = times(partsPerBonus, () => ({
    answeringTeamId: null,
  }));
  const [bonusesState, setBonusesState] = useState(initialBonusesArray);

  const onClickBonus = (teamId, bonusIndex) => {
    const nextState = produce(bonusesState, (draft) => {
      draft[bonusIndex].answeringTeamId =
        teamId === draft[bonusIndex].answeringTeamId ? null : teamId;
    });
    setBonusesState(nextState);
  };
  console.log(bonusesState);
  return (
    <>
      <Row className="mb-3">
        {bonusesState.map((bonus, index) => (
          <Col lg={12} key={index} className="mb-3 d-flex">
            <span className="p-2">Part {index + 1}</span>
            {teams.map((team) => (
              <Button
                key={team.id}
                type={
                  team.id === bonus.answeringTeamId
                    ? "success"
                    : "outline-secondary"
                }
                onClick={() => onClickBonus(team.id, index)}
              >
                +{bonusPointValue} for {team.name}
              </Button>
            ))}
            <hr />
          </Col>
        ))}
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12} className="d-flex justify-content-between">
          <Button type="secondary" onClick={onClickBack}>
            Back
          </Button>
          <Button type="primary">Next Tossup</Button>
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
  onClickBack,
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
          onClickBack={onClickBack}
          currentCycle={currentCycle}
        />
      )}
    </Card>
  );
};

export default CurrentCyclePanel;

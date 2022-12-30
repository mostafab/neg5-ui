import React from "react";
import { Row, Col, InputGroup } from "react-bootstrap";

import { answerTypeToPillType } from "@libs/tournamentForms";
import Card from "@components/common/cards";
import Button from "@components/common/button";

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

const TossupPanel = ({
  teams,
  rules,
  onClickAnswer,
  currentCycle,
  onBack,
  onNoAnswer,
}) => (
  <>
    <Row className="mb-3">
      {teams.map((team) => (
        <Col lg={6} md={6} sm={12} key={team.id}>
          <TeamCard team={team} rules={rules} onClickAnswer={onClickAnswer} />
        </Col>
      ))}
    </Row>
    <Row>
      <Col lg={12} md={12} sm={12} className="d-flex justify-content-between">
        {currentCycle.number > 1 && (
          <Button type="secondary" onClick={onBack}>
            Back
          </Button>
        )}
        <Button type="primary" onClick={onNoAnswer}>
          No Answer
        </Button>
      </Col>
    </Row>
  </>
);

export default TossupPanel;

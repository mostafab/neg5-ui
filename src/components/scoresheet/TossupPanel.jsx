import React from "react";
import { Row, Col, InputGroup } from "react-bootstrap";

import { answerTypeToPillType } from "@libs/tournamentForms";
import Card from "@components/common/cards";
import Button from "@components/common/button";

const TeamCard = ({ team, rules, onClickAnswer, score }) => (
  <Card title={`${team.name} (${score})`} shadow={false}>
    {team.players.map((player) => (
      <InputGroup className="mb-3" key={player.id}>
        <InputGroup.Text className="w-100 overflow-auto">
          {player.name}
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

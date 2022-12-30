import React from "react";
import { Row, Col, ButtonGroup } from "react-bootstrap";

import Button from "@components/common/button";

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

export default BonusPanel;
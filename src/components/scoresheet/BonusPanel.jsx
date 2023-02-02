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
        {currentCycle.bonuses.map((bonus) => (
          <Col
            lg={12}
            key={bonus.number}
            className="mb-3 d-flex justify-content-between"
          >
            <div
              className={`p-2 border ${usesBouncebacks ? "" : "w-25"}`}
              style={{ textAlign: "center" }}
            >
              Part {bonus.number}
            </div>
            {teams
              .filter((t) => usesBouncebacks || t.id === answeringTeamId)
              .map((team) => (
                <Button
                  key={team.id}
                  type={
                    team.id === bonus.answeringTeamId ? "success" : "secondary"
                  }
                  onClick={() => onBonus(team.id, bonus.number)}
                  className={usesBouncebacks ? "" : "w-75"}
                >
                  +{bonusPointValue} for {team.name}
                </Button>
              ))}
          </Col>
        ))}
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12} className="d-flex justify-content-between">
          {onBack && (
            <Button type="outline-secondary" onClick={onBack}>
              Back
            </Button>
          )}
          <Button type="outline-primary" onClick={onNextTossup}>
            Next Tossup
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default BonusPanel;

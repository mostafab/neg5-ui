import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Col, Row } from "react-bootstrap";
import orderBy from "lodash/orderBy";
import chunk from "lodash/chunk";

import Card from "@components/common/cards";

const TournamentTeamsPanel = ({ teams }) => {
  const orderedAndChunked = chunk(orderBy(teams, "name"), 10);
  return (
    <Card title={`Teams (${teams.length})`}>
      <Row>
        {orderedAndChunked.map((chunk, idx) => (
          <Col lg={4} md={6} sm={12} key={idx} className="mb-3">
            <ListGroup>
              {chunk.map((team) => (
                <ListGroup.Item key={team.id} action>
                  {team.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default TournamentTeamsPanel;

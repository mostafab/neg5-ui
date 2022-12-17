import React from "react";
import { Row, Col } from "react-bootstrap";

import Card from "components/common/cards";

const TournamentGallery = ({ tournaments, title, className = "" }) => {
  return (
    <div className="TournamentGallery">
      <h1 className={className}>{title}</h1>
      <Row md={3} sm={2} lg={3}>
        {tournaments.map((t) => (
          <Col key={t.id}>
            <Card className="mb-4" title={t.name}>
              <p>{t.location}</p>
              <p>{t.questionSet}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TournamentGallery;

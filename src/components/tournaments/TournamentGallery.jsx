import React from "react";
import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";

import Card from "components/common/cards";

const TournamentGallery = ({ tournaments, title, className = "" }) => {
  const router = useRouter();
  return (
    <div className={`TournamentGallery ${className}`}>
      <h1>{title}</h1>
      <Row>
        {tournaments.map((t) => (
          <Col key={t.id} xs={12} sm={12} md={12}>
            <Card
              className="mb-4"
              title={t.name}
              onClick={() => router.push(`/tournaments/${t.id}`)}
            >
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

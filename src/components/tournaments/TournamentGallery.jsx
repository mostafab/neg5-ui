import React from "react";
import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";

import Card from "components/common/cards";

const TournamentGallery = ({
  tournaments,
  title,
  className = "",
  cta = null,
}) => {
  const router = useRouter();
  return (
    <div className={`TournamentGallery ${className}`}>
      <h4 className="d-inline-block align-middle mr-5">{title}</h4>
      {cta}
      <Row>
        {tournaments.map((t) => (
          <Col key={t.id} xs={12} sm={12} md={12} lg={4}>
            <Card
              className="mb-4"
              title={t.name}
              onClick={() => router.push(`/tournaments/${t.id}`)}
            >
              <p>{t.location}</p>
              <p>{t.tournamentDate}</p>
              <p>{t.questionSet}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TournamentGallery;

import React from "react";
import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";

import TournamentCard from "./TournamentCard";

const TournamentGallery = ({
  tournaments,
  title,
  className = "",
  cta = null,
}) => {
  const router = useRouter();
  return (
    <div className={`TournamentGallery ${className}`}>
      <div className="d-flex justify-content-between mb-3">
        <h5 className="">{title}</h5>
        {cta}
      </div>
      <Row>
        {tournaments.map((t) => (
          <Col key={t.id} xs={12} sm={12} md={6} lg={4}>
            <TournamentCard
              {...t}
              onClick={() => router.push(`/tournaments/${t.id}`)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TournamentGallery;

import React, { useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";

import { useAppDispatch } from "store";
import { loadTournamentsAsync } from "features/myTournaments/myTournamentsSlice";

import TournamentGallery from "components/tournaments/TournamentGallery";
import Button from "components/common/button";

const MyTournaments = ({
  collaboratingTournaments,
  ownTournaments,
  loadingData,
}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadTournamentsAsync());
  }, []);
  if (loadingData) {
    return <div>Loading</div>;
  }
  return (
    <Container>
      <Row className="d-flex">
        <Col sm={6}>
          <TournamentGallery
            title="Your Tournaments"
            tournaments={ownTournaments}
            cta={<Button type="primary">+</Button>}
          />
        </Col>
        <Col sm={6}>
          <TournamentGallery
            title="Shared with you"
            tournaments={collaboratingTournaments}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MyTournaments;

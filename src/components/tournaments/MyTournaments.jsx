import React, { useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";

import { useAppDispatch } from "store";
import { loadTournamentsAsync } from "features/myTournaments/myTournamentsSlice";

import TournamentGallery from "components/tournaments/TournamentGallery";

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
        <TournamentGallery
          title="Your Tournaments"
          tournaments={ownTournaments}
          className="mt-5"
        />
      </Row>
      <Row className="d-flex">
        <TournamentGallery
          title="Shared with you"
          tournaments={collaboratingTournaments}
          className="mt-3"
        />
      </Row>
    </Container>
  );
};

export default MyTournaments;

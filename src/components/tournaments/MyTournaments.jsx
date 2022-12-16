import React, { useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";

import { useAppDispatch } from "store";
import { loadTournamentsAsync } from "features/myTournaments/myTournamentsSlice";

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
        My Tournaments
      </Row>
      <Row className="d-flex">
        Shared Tournaments
      </Row>
    </Container>
  )
};

export default MyTournaments;

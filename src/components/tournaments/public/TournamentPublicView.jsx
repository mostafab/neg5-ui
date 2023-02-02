import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { useAppDispatch } from "@store";
import { loadTournamentDataAsync } from "@features/tournamentView/tournamentInfoSlice";

import { TournamentIdContext } from "@components/tournaments/common/context";

import PoolsAndSchedules from "@components/tournaments/public/schedule/PoolsAndSchedules";
import Header from "./Header";

const TournamentPublicView = ({ tournamentId }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadTournamentDataAsync(tournamentId));
  }, [tournamentId]);
  return (
    <TournamentIdContext.Provider value={tournamentId}>
      <Container className="TournamentPublicView p-3">
        <Row className="mb-3">
          <Col lg={12} md={12} sm={12}>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <PoolsAndSchedules />
          </Col>
        </Row>
      </Container>
    </TournamentIdContext.Provider>
  );
};

export default TournamentPublicView;

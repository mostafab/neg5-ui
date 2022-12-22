import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { useAppDispatch } from "@store";
import { loadTournamentDataAsync } from "@features/tournamentView/tournamentInfoSlice";

import TournamentInfoPanel from "@features/tournamentView/containers/infoPanel";
import TournamentRulesPanel from "@features/tournamentView/containers/rulesPanel";

const TournamentRootView = ({ tournamentId }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadTournamentDataAsync(tournamentId));
  }, [tournamentId]);
  return (
    <Container className="TournamentRootView mt-4">
      <Row>
        <Col lg={3} md={5} sm={6}>
          <Row>
            <Col lg={12} md={12} sm={12} className="mb-3">
              <TournamentInfoPanel />
            </Col>
            <Col lg={12} md={12} sm={12}>
              <TournamentRulesPanel />
            </Col>
          </Row>
        </Col>
        <Col lg={9} md={7} sm={6}></Col>
      </Row>
    </Container>
  );
};

export default TournamentRootView;

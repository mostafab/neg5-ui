import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { useAppDispatch } from "@store";
import { loadTournamentDataAsync } from "@features/tournamentView/tournamentInfoSlice";

import InfoPanel from "@features/tournamentView/containers/infoPanel";
import RulesPanel from "@features/tournamentView/containers/rulesPanel";
import PhasesPanel from "@features/tournamentView/containers/phasesPanel";
import TeamsPanel from "@features/tournamentView/containers/teamsPanel";
import MatchesPanel from "@features/tournamentView/containers/matchesPanel";
import CollaboratorsPanel from "@features/tournamentView/containers/collaboratorsPanel";
import { TournamentIdContext } from "@components/tournaments/common/context";

const TournamentRootView = ({ tournamentId }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadTournamentDataAsync(tournamentId));
  }, [tournamentId]);
  return (
    <TournamentIdContext.Provider value={tournamentId}>
      <Container className="TournamentRootView mt-4">
        <Row>
          <Col lg={3} md={5} sm={6}>
            <Row>
              <Col lg={12} md={12} sm={12} className="mb-3">
                <InfoPanel />
              </Col>
              <Col lg={12} md={12} sm={12} className="mb-3">
                <CollaboratorsPanel />
              </Col>
              <Col lg={12} md={12} sm={12} className="mb-3">
                <RulesPanel />
              </Col>
              <Col lg={12} md={12} sm={12} className="mb-3">
                <PhasesPanel />
              </Col>
            </Row>
          </Col>
          <Col lg={9} md={7} sm={6}>
            <Row>
              <Col lg={12} md={12} sm={12} className="mb-3">
                <TeamsPanel />
              </Col>
              <Col lg={12} md={12} sm={12} className="mb-3">
                <MatchesPanel />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </TournamentIdContext.Provider>
  );
};

export default TournamentRootView;

import React, { useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";

import { useAppDispatch } from "store";
import {
  loadTournamentsAsync,
  clickAddTournament,
} from "features/myTournaments/myTournamentsSlice";

import TournamentGallery from "components/tournaments/TournamentGallery";
import Icon from "components/common/icon";
import Button from "components/common/button";

const MyTournaments = ({ collaboratingTournaments, ownTournaments }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadTournamentsAsync());
  }, []);
  return (
    <Container>
      <Row className="d-flex">
        <Col sm={12} lg={12}>
          <TournamentGallery
            title="Upcoming Tournaments"
            tournaments={ownTournaments}
            cta={
              <Button
                className="m-3 btn-sm"
                type="primary"
                onClick={() => dispatch(clickAddTournament())}
              >
                <Icon name="Plus" size="20" />
              </Button>
            }
          />
        </Col>
        <Col sm={6} lg={12}>
          <TournamentGallery
            title="Past Tournaments"
            emptyText=""
            tournaments={collaboratingTournaments}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MyTournaments;

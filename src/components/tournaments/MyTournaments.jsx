import React, { useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";

import { useAppDispatch } from "store";
import { loadTournamentsAsync } from "features/myTournaments/myTournamentsSlice";

import TournamentGallery from "components/tournaments/TournamentGallery";
import Card from "components/common/cards";
import Icon from "components/common/icon";
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
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <Card title="Loading" />
      </div>
    );
  }
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
                onClick={() => console.log(Math.random())}
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

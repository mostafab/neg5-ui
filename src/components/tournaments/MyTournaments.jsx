import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";

import { useAppDispatch } from "@store";
import { loadTournamentsAsync } from "@features/myTournaments/myTournamentsSlice";

import Icon from "@components/common/icon";
import Button from "@components/common/button";

import TournamentGallery from "./TournamentGallery";
import CreateTournamentDialog from "./CreateTournamentDialog";

const MyTournaments = ({
  past,
  upcoming,
  submittingTournament,
  submittingTournamentError,
}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadTournamentsAsync());
  }, []);
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      {showForm && (
        <CreateTournamentDialog
          onClose={() => setShowForm(false)}
          submitting={submittingTournament}
          error={submittingTournamentError}
        />
      )}
      <Container>
        <Row className="d-flex">
          <Col sm={12} lg={12}>
            <TournamentGallery
              title="Upcoming Tournaments"
              tournaments={upcoming}
              cta={
                <Button
                  className="m-3 btn-sm"
                  type="primary"
                  onClick={() => setShowForm(true)}
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
              tournaments={past}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyTournaments;

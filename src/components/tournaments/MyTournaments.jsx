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
          <Col sm={12} md={12} lg={12} className="mb-3">
            <TournamentGallery
              title="Current & Upcoming Tournaments"
              tournaments={upcoming}
              cta={
                <Button
                  className="btn-sm"
                  type="outline-primary"
                  onClick={() => setShowForm(true)}
                >
                  New Tournament
                </Button>
              }
            />
          </Col>
          <Col sm={6} md={12} lg={12}>
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

import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";

import { useAppDispatch } from "@store";
import {
  teamDeleted,
  loadTournamentTeamsAsync,
} from "@features/tournamentView/teamsSlice";
import { deleteTeam } from "@api/team";
import { doValidatedApiRequest } from "@api/common";
import { Events } from "@libs/liveEvents";

import Card from "@components/common/cards";
import DropdownActions from "@components/common/DropdownActions";
import ActionConfirmationAlert from "@components/common/ActionConfirmationAlert";
import CommonErrorBanner from "@components/common/errors/CommonErrorBanner";

import {
  TournamentLiveChangesContext,
  TournamentIdContext,
} from "@components/tournaments/common/context";

import TeamForm from "./TeamForm";
import TeamMatches from "./TeamMatches";

const TeamDisplay = ({
  team,
  matches,
  teams,
  onSubmitSuccess,
  onDeleteSuccess,
  editable,
}) => {
  const [readOnly, setReadOnly] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [submitData, setSubmitData] = useState({
    submitting: false,
    error: null,
  });
  const tournamentId = useContext(TournamentIdContext);
  useEffect(() => {
    setIsDeleting(false);
    setSubmitData({
      error: null,
      submitting: false,
    });
  }, [team.id]);
  const dispatch = useAppDispatch();
  const liveUpdatesContext = useContext(TournamentLiveChangesContext);

  const onConfirmDelete = async () => {
    setSubmitData({
      error: null,
      submitting: true,
    });
    const response = await doValidatedApiRequest(() => deleteTeam(team.id));
    if (response.errors) {
      setSubmitData({
        error: response.errors,
        submitting: false,
      });
    } else {
      setSubmitData({
        submitting: false,
      });
      await dispatch(teamDeleted({ teamId: team.id }));
      await dispatch(loadTournamentTeamsAsync(tournamentId));
      onDeleteSuccess && onDeleteSuccess({ id: team.id });
      liveUpdatesContext.trigger(Events.teams.deleted, { teamId: team.id });
    }
  };

  return (
    <Card>
      {isDeleting && (
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="p-4">
              <ActionConfirmationAlert
                className="mb-0"
                message={`Are you sure you want to delete ${team.name}? This action is unrecoverable.`}
                level="danger"
                onCancel={() => {
                  setIsDeleting(false);
                  setSubmitData({
                    error: null,
                    submitting: false,
                  });
                }}
                onConfirm={onConfirmDelete}
                submitting={submitData.submitting}
              />
              {submitData.error && (
                <CommonErrorBanner className="mt-3" errors={submitData.error} />
              )}
            </div>
          </Col>
        </Row>
      )}
      {!isDeleting && (
        <Row>
          <Col lg={team.id ? 6 : 12} md={12} sm={12}>
            {team.id && readOnly && !isDeleting && editable && (
              <DropdownActions
                className="mb-3"
                actions={[
                  {
                    label: <span className="text-gray">Edit</span>,
                    onClick: () => setReadOnly(false),
                    separator: <hr className="mt-1 mb-1" />,
                  },
                  {
                    label: (
                      <span className="text-danger">Delete {team.name}</span>
                    ),
                    onClick: () => setIsDeleting(true),
                  },
                ]}
              />
            )}
            <TeamForm
              team={team}
              readOnly={(readOnly && team.id) || !editable}
              onCancel={team.id ? () => setReadOnly(true) : null}
              onSubmitSuccess={
                team.id
                  ? (result) => {
                      setReadOnly(true);
                      onSubmitSuccess(result);
                    }
                  : null
              }
            />
          </Col>
          {team.id && (
            <Col lg={6} md={12} sm={12}>
              <TeamMatches team={team} matches={matches} teams={teams} />
            </Col>
          )}
        </Row>
      )}
    </Card>
  );
};

export default TeamDisplay;

import React, { useState, useContext, useEffect } from "react";

import * as Yup from "yup";
import orderBy from "lodash/orderBy";

import { Form, ResetListener } from "@components/common/forms";
import CommonErrorBanner from "@components/common/errors/CommonErrorBanner";
import TeamFields from "@components/tournaments/common/TeamFields";
import {
  TournamentIdContext,
  TournamentLiveChangesContext,
} from "@components/tournaments/common/context";

import { createTeam, updateTeam } from "@api/team";
import { doValidatedApiRequest } from "@api/common";
import { teamCreatedOrUpdated } from "@features/tournamentView/teamsSlice";
import { sanitizeFormValuesRecursive } from "@libs/forms";
import { Events } from "@libs/liveEvents";
import { useAppDispatch } from "@store";

const initialPlayerValue = () => ({
  name: "",
  year: "",
  id: "",
});

const initialValues = (team) => ({
  id: team.id || null,
  teamGroupId: team.teamGroupId || "",
  name: team.name || "",
  players: orderBy(team.players || [initialPlayerValue()], "name").map(
    (player) => ({
      name: player.name || "",
      year: player.year || "",
      id: player.id || "",
    })
  ),
});

const validation = (team) =>
  Yup.object({
    name: Yup.string().required("Please provide a team name."),
    players: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Please enter a name."),
      })
    ),
    teamGroupId: team?.id
      ? Yup.number()
      : Yup.number().required("Please choose an organization."),
  });

const TeamForm = ({
  team,
  readOnly = false,
  onCancel = null,
  onSubmitSuccess,
  teamGroups,
}) => {
  const [submitData, setSubmitData] = useState({
    submitting: false,
    error: null,
  });
  // Clear out error when the user switches teams
  useEffect(() => {
    setSubmitData({
      ...submitData,
      error: null,
    });
  }, [team.id, readOnly]);
  const dispatch = useAppDispatch();
  const tournamentId = useContext(TournamentIdContext);
  const liveUpdatesContext = useContext(TournamentLiveChangesContext);

  const onSubmit = async (values, { resetForm }) => {
    setSubmitData({
      error: null,
      submitting: true,
    });
    const sanitizedValues = sanitizeFormValuesRecursive(values);
    sanitizedValues.tournamentId = tournamentId;
    const payload = await doValidatedApiRequest(() =>
      team.id ? updateTeam(sanitizedValues) : createTeam(sanitizedValues)
    );
    if (payload.errors) {
      setSubmitData({
        ...submitData,
        submitting: false,
        error: payload.errors,
      });
    } else {
      setSubmitData({
        ...submitData,
        submitting: false,
        error: null,
      });
      dispatch(teamCreatedOrUpdated(payload));
      if (!team.id) {
        resetForm({ values: initialValues(team) });
      }
      onSubmitSuccess && onSubmitSuccess(payload);
      liveUpdatesContext.trigger(Events.teams.createdOrUpdated, payload);
    }
  };

  return (
    <Form
      name="TeamForm"
      submitButtonText="Save"
      initialValues={initialValues(team)}
      validation={validation(team)}
      onSubmit={onSubmit}
      readOnly={readOnly}
      cancelButtonText="Cancel"
      onCancel={onCancel}
      submitting={submitData.submitting}
    >
      <ResetListener
        changeKey={team.id}
        initialValues={() => initialValues(team)}
      />
      <TeamFields teamGroups={teamGroups} />
      {submitData.error && <CommonErrorBanner errors={submitData.error} />}
    </Form>
  );
};

export default TeamForm;

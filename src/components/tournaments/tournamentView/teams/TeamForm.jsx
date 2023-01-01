import React, { useState, useContext, useEffect } from "react";
import { InputGroup } from "react-bootstrap";

import * as Yup from "yup";
import orderBy from "lodash/orderBy";

import {
  Form,
  Text,
  RepeatField,
  ResetListener,
} from "@components/common/forms";
import Button from "@components/common/button";
import { Info } from "@components/common/alerts";
import CommonErrorBanner from "@components/common/errors/CommonErrorBanner";
import PlayerYearSelect from "@components/tournaments/common/PlayerYearSelect";
import { TournamentIdContext } from "@components/tournaments/common/context";

import { createTeam, updateTeam } from "@api/team";
import { doValidatedApiRequest } from "@api/common";
import { teamCreatedOrUpdated } from "features/tournamentView/teamsSlice";
import { sanitizeFormValuesRecursive } from "@libs/forms";
import { useAppDispatch } from "@store";

const initialPlayerValue = () => ({
  name: "",
  year: "",
  id: "",
});

const initialValues = (team) => ({
  id: team.id || null,
  name: team.name || "",
  players: orderBy(team.players || [initialPlayerValue()], "name").map(
    (player) => ({
      name: player.name || "",
      year: player.year || "",
      id: player.id || "",
    })
  ),
});

const validation = Yup.object({
  name: Yup.string().required("Please provide a team name."),
  players: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Please enter a name."),
    })
  ),
});

const TeamForm = ({
  team,
  readOnly = false,
  onCancel = null,
  onSubmitSuccess,
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
      } else {
        onSubmitSuccess && onSubmitSuccess();
      }
    }
  };

  return (
    <Form
      name="TeamForm"
      submitButtonText="Save"
      initialValues={initialValues(team)}
      validation={validation}
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
      <Text name="name" label="Team Name" />
      <p className="d-flex justify-content-center">Players</p>
      <RepeatField
        name="players"
        addObjectProps={{
          buttonText: "Add a Player",
          newObject: initialPlayerValue,
        }}
        render={(_val, { index, readOnly }, { remove }) => {
          const labelPrefix = `Player ${index + 1}`;
          return (
            <div key={index}>
              <InputGroup>
                <Text
                  name={`players[${index}].name`}
                  label={`${labelPrefix} Name`}
                />
                <PlayerYearSelect
                  name={`players[${index}].year`}
                  label={`${labelPrefix} Year`}
                />
                {!readOnly && (
                  <Button
                    type="outline-danger"
                    className="mb-3"
                    icon="X"
                    onClick={() => remove(index)}
                  />
                )}
              </InputGroup>
            </div>
          );
        }}
      />
      {!team.id && (
        <Info className="mt-3">
          After creating a team, you can assign it a pool in the "Team Pools"
          panel.
        </Info>
      )}
      {submitData.error && <CommonErrorBanner errors={submitData.error} />}
    </Form>
  );
};

export default TeamForm;

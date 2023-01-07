import React, { useState, useEffect, useContext } from "react";
import { Row, Col, InputGroup } from "react-bootstrap";
import * as Yup from "yup";
import orderBy from "lodash/orderBy";
import keyBy from "lodash/keyBy";
import mapValues from "lodash/mapValues";

import { useAppDispatch } from "@store";
import { matchCreatedOrUpdated } from "@features/tournamentView/matchesSlice";

import {
  Form,
  Number,
  Text,
  Select,
  RepeatField,
  ResetListener,
  Checkbox,
} from "@components/common/forms";
import { X } from "@components/common/icon";
import CommonErrorBanner from "@components/common/errors/CommonErrorBanner";
import { TournamentIdContext } from "@components/tournaments/common/context";

import { getTeamOptions, getPhaseOptions } from "@libs/tournamentForms";
import { sanitizeFormValuesRecursive } from "@libs/forms";

import { doValidatedApiRequest } from "@api/common";
import { createMatch, updateMatch } from "@api/match";

const mapTeamChangeToNewPlayers = (selectedTeamId, teams, tossupValues) => {
  const matchingTeam = teams.find((t) => t.id === selectedTeamId);
  return matchingTeam.players.map((player) => ({
    playerId: player.id,
    tossupsHeard: "",
    answers: tossupValues.map(({ value }) => ({
      numberGotten: "",
      tossupValue: value,
    })),
  }));
};

const initialTeamsValue = () => ({
  teamId: "",
  score: "",
  forfeit: "",
  bouncebackPoints: "",
  overtimeTossupsGotten: "",
  players: [],
});

const initialValues = (match, tossupValues) => ({
  id: match.id || "",
  round: match.round || "",
  tossupsHeard: match.tossupsHeard || "",
  room: match.room || "",
  moderator: match.moderator || "",
  packet: match.packet || "",
  serialId: match.serialId || "",
  notes: match.notes || "",
  phases: match.phases || [],
  isTiebreaker: match.isTiebreaker || "",
  teams: orderBy(
    match.teams || [initialTeamsValue(), initialTeamsValue()],
    "teamId"
  ).map((team) => ({
    teamId: team.teamId || "",
    score: team.score,
    overtimeTossupsGotten: team.overtimeTossupsGotten,
    bouncebackPoints: team.bouncebackPoints,
    forfeit: team.forfeit || false,
    players: (team.players || []).map((player) => ({
      playerId: player.playerId || "",
      tossupsHeard: player.tossupsHeard || null,
      answers: orderBy(tossupValues, "value", "desc").map(({ value }) => {
        const numberGotten =
          player.answers.find((a) => a.tossupValue === value)?.numberGotten ||
          0;
        return {
          tossupValue: value,
          numberGotten,
        };
      }),
    })),
  })),
});

const validation = Yup.object({
  round: Yup.number().required("Enter a round").positive(),
  tossupsHeard: Yup.number().positive(),
  room: Yup.string(),
  packet: Yup.string(),
  serialId: Yup.string(),
  notes: Yup.string(),
});

const answerTypeToClass = {
  Base: "info",
  Power: "success",
  Neg: "danger",
};

const MatchForm = ({
  match,
  teams,
  rules,
  playersById,
  phases,
  onCancel = null,
  onSubmit = null,
  onSubmitSuccess,
  stacked = false,
  readOnly = false,
  editableFields = [],
}) => {
  const teamOptions = getTeamOptions(teams);
  const phaseOptions = getPhaseOptions(phases);
  const { usesBouncebacks, tossupValues } = rules;
  const tossupValueAnswerTypes = mapValues(
    keyBy(tossupValues, "value"),
    (v) => v.answerType
  );
  const dispatch = useAppDispatch();
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
  }, [match.id, readOnly]);

  const tournamentId = useContext(TournamentIdContext);
  const internalOnSubmit = async (values, actions) => {
    if (onSubmit) {
      onSubmit(values, actions, setSubmitData);
      return;
    }
    setSubmitData({
      error: null,
      submitting: true,
    });
    const sanitizedValues = sanitizeFormValuesRecursive(values);
    sanitizedValues.tournamentId = tournamentId;
    const payload = await doValidatedApiRequest(() =>
      match.id ? updateMatch(sanitizedValues) : createMatch(sanitizedValues)
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
      dispatch(
        matchCreatedOrUpdated({ match: payload, oldId: match.id || null })
      );
      if (!match.id) {
        actions.resetForm({ values: initialValues(match) });
      }
      onSubmitSuccess && onSubmitSuccess(payload);
    }
  };

  return (
    <Form
      name="MatchForm"
      initialValues={initialValues(match, tossupValues)}
      submitting={submitData.submitting}
      submitButtonText="Save"
      validation={validation}
      onSubmit={internalOnSubmit}
      readOnly={readOnly}
      editableFields={editableFields}
      onCancel={onCancel}
    >
      <ResetListener
        changeKey={match.id}
        initialValues={() => initialValues(match, tossupValues)}
      />
      <Row>
        <Col lg={3} md={6}>
          <Number name="round" label="Round" />
        </Col>
      </Row>
      <Row>
        <RepeatField
          name="teams"
          render={(_val, { index }) => {
            const teamLabelPrefix = `Team ${index + 1} `;
            return (
              <Col lg={stacked ? 12 : 6} md={12} key={index}>
                <Row>
                  <Col lg={6} sm={12} md={12} className="mb-3">
                    <Checkbox
                      name={`teams[${index}].forfeit`}
                      label={`${teamLabelPrefix} Forfeits`}
                    />
                  </Col>
                </Row>
                <Row>
                  <InputGroup>
                    <Select
                      name={`teams[${index}].teamId`}
                      label={teamLabelPrefix}
                      options={teamOptions}
                      onChange={(newTeamId, formContext) => {
                        const fieldHelper = formContext.getFieldHelpers(
                          `teams[${index}].players`
                        );
                        fieldHelper.setValue(
                          mapTeamChangeToNewPlayers(
                            newTeamId,
                            teams,
                            tossupValues
                          )
                        );
                      }}
                    />
                    <Number
                      name={`teams[${index}].score`}
                      label={`${teamLabelPrefix} Score`}
                    />
                  </InputGroup>
                </Row>
                <Row>
                  <Col lg={6} sm={12} md={12}>
                    <Number
                      name={`teams[${index}].overtimeTossupsGotten`}
                      label={`${teamLabelPrefix} Overtime TUs`}
                    />
                  </Col>
                  {usesBouncebacks && (
                    <Col lg={6} sm={12} md={12}>
                      <Number
                        name={`teams[${index}].bouncebackPoints`}
                        label={`${teamLabelPrefix} Bounceback Points`}
                      />
                    </Col>
                  )}
                </Row>
                <Row>
                  <RepeatField
                    name={`teams[${index}].players`}
                    render={(
                      playerFieldVal,
                      { index: playerFieldIndex, readOnly },
                      { remove }
                    ) => {
                      const playerName =
                        playersById[playerFieldVal.playerId]?.name;
                      return (
                        <InputGroup key={playerFieldIndex} size="sm">
                          <InputGroup.Text className="w-100 d-flex justify-content-between">
                            {playerName}
                            {!readOnly && (
                              <X
                                size="20"
                                onClick={() => remove(playerFieldIndex)}
                              />
                            )}
                          </InputGroup.Text>
                          <Number
                            name={`teams[${index}].players[${playerFieldIndex}].tossupsHeard`}
                            label="TUHs"
                          />
                          <RepeatField
                            name={`teams[${index}].players[${playerFieldIndex}].answers`}
                            render={(
                              answerFieldValue,
                              { index: answerIndex }
                            ) => {
                              const labelClass = `text-${
                                answerTypeToClass[
                                  tossupValueAnswerTypes[
                                    answerFieldValue.tossupValue
                                  ]
                                ]
                              }`;
                              return (
                                <Number
                                  key={answerIndex}
                                  name={`teams[${index}].players[${playerFieldIndex}].answers[${answerIndex}].numberGotten`}
                                  label={
                                    <label className={labelClass}>
                                      # of {answerFieldValue.tossupValue}s
                                    </label>
                                  }
                                />
                              );
                            }}
                          />
                        </InputGroup>
                      );
                    }}
                  />
                </Row>
              </Col>
            );
          }}
        />
      </Row>
      <hr />
      <Row>
        <Col lg={stacked ? 6 : 3} md={6}>
          <Text name="moderator" label="Moderator" />
          <Text name="room" label="Room" />
          <Text name="serialId" label="Serial Id" />
        </Col>
        <Col lg={stacked ? 6 : 3} md={6}>
          <Number name="tossupsHeard" label="Tossups Heard" />
          <Text name="packet" label="Packet" />
        </Col>
        <Col lg={stacked ? 12 : 6} md={12}>
          <Checkbox name="isTiebreaker" label="Tiebreaker" />
          <Select
            name="phases"
            label="Phases"
            options={phaseOptions}
            multiple
          />
          <Text textarea name="notes" label="Notes" />
        </Col>
      </Row>
      {submitData.error && <CommonErrorBanner errors={submitData.error} />}
    </Form>
  );
};

export default MatchForm;

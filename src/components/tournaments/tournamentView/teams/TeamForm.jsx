import React from "react";
import { InputGroup } from "react-bootstrap";

import * as Yup from "yup";

import {
  Form,
  Text,
  RepeatField,
  ResetListener,
} from "@components/common/forms";
import { X } from "@components/common/icon";
import PlayerYearSelect from "@components/tournaments/common/PlayerYearSelect";

const initialValues = (team) => ({
  name: team.name || "",
  players: (team.players || []).map((player) => ({
    name: player.name || "",
    year: player.year || "",
  })),
});

const validation = Yup.object({
  name: Yup.string().required("Please provide a team name."),
});

const TeamForm = ({ team }) => {
  return (
    <Form
      name="TeamForm"
      submitButtonText="Save Changes"
      initialValues={initialValues(team)}
      validation={validation}
    >
      <ResetListener
        changeKey={team.id}
        initialValues={() => initialValues(team)}
      />
      <Text name="name" label="Team Name" />
      <p>Players</p>
      <RepeatField
        name="players"
        render={(_val, { index }, { remove }) => {
          const labelPrefix = `Player ${index + 1}`;
          return (
            <InputGroup key={index}>
              <Text
                name={`players[${index}].name`}
                label={`${labelPrefix} Name`}
              />
              <PlayerYearSelect
                name={`players[${index}].year`}
                label={`${labelPrefix} Year`}
              />
              <InputGroup.Text
                className="mb-3"
                role="button"
                onClick={() => remove(index)}
              >
                <X />
              </InputGroup.Text>
            </InputGroup>
          );
        }}
      />
    </Form>
  );
};

export default TeamForm;

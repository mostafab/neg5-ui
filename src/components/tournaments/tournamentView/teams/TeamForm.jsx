import React from "react";
import { InputGroup } from "react-bootstrap";

import * as Yup from "yup";
import orderBy from "lodash/orderBy";

import {
  Form,
  Text,
  RepeatField,
  ResetListener,
} from "@components/common/forms";
import { X } from "@components/common/icon";
import PlayerYearSelect from "@components/tournaments/common/PlayerYearSelect";

const initialPlayerValue = () => ({
  name: "",
  year: "",
});

const initialValues = (team) => ({
  name: team.name || "",
  players: orderBy(team.players || [initialPlayerValue()], "name").map(
    (player) => ({
      name: player.name || "",
      year: player.year || "",
    })
  ),
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
      onSubmit={(values) => console.log(values)}
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
          newObject: () => initialPlayerValue(),
        }}
        render={(_val, { index }, { remove }) => {
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
                <InputGroup.Text
                  className="mb-3"
                  role="button"
                  onClick={() => remove(index)}
                >
                  <X />
                </InputGroup.Text>
              </InputGroup>
            </div>
          );
        }}
      />
    </Form>
  );
};

export default TeamForm;

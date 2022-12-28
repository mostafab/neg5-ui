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
import Button from "@components/common/button";
import { Info } from "@components/common/alerts";
import PlayerYearSelect from "@components/tournaments/common/PlayerYearSelect";

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
});

const TeamForm = ({ team, readOnly = false, onCancel = null }) => {
  return (
    <Form
      name="TeamForm"
      submitButtonText="Save"
      initialValues={initialValues(team)}
      validation={validation}
      onSubmit={(values) => console.log(values)}
      readOnly={readOnly}
      cancelButtonText="Cancel"
      onCancel={onCancel}
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
    </Form>
  );
};

export default TeamForm;

import React from "react";

import { InputGroup } from "react-bootstrap";

import { Text, RepeatField } from "@components/common/forms";
import Button from "@components/common/button";
import PlayerYearSelect from "@components/tournaments/common/PlayerYearSelect";

const initialPlayerValue = () => ({
  name: "",
  year: "",
  id: "",
});

const TeamFields = ({ fieldNamePrefix = "" }) => {
  return (
    <>
      <Text name={`${fieldNamePrefix}name`} label="Team Name" />
      <p className="d-flex justify-content-center">Players</p>
      <RepeatField
        name={`${fieldNamePrefix}players`}
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
                  name={`${fieldNamePrefix}players[${index}].name`}
                  label={`${labelPrefix} Name`}
                />
                <PlayerYearSelect
                  name={`${fieldNamePrefix}players[${index}].year`}
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
    </>
  );
};

export default TeamFields;

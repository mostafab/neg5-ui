import React from "react";
import { InputGroup, Row, Col } from "react-bootstrap";
import orderBy from "lodash/orderBy";

import { Text, RepeatField, Select } from "@components/common/forms";
import Button from "@components/common/button";
import PlayerYearSelect from "@components/tournaments/common/PlayerYearSelect";

const initialPlayerValue = () => ({
  name: "",
  year: "",
  id: "",
});

const TeamFields = ({ fieldNamePrefix = "", teamGroups = [] }) => {
  const groupOptions = orderBy(
    teamGroups.map((tg) => ({
      value: tg.id,
      label: tg.name,
    })),
    "label"
  );
  const showGroupOptions = teamGroups.length > 0;
  return (
    <>
      <Row>
        <Col
          lg={showGroupOptions ? 6 : 12}
          md={showGroupOptions ? 6 : 12}
          sm={12}
        >
          <Text name={`${fieldNamePrefix}name`} label="Team Name" />
        </Col>
        {showGroupOptions && (
          <Col lg={6} md={6} sm={12}>
            <Select
              name={`${fieldNamePrefix}teamGroupId`}
              label="Organization"
              options={groupOptions}
            />
          </Col>
        )}
      </Row>
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

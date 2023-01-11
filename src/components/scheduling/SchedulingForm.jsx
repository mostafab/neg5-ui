import React from "react";
import { Row, Col } from "react-bootstrap";
import orderBy from "lodash/orderBy";
import groupBy from "lodash/groupBy";

import Card from "@components/common/cards";
import { Form, RepeatField, Select, Text } from "@components/common/forms";
import { X } from "@components/common/icon";
import { getTeamOptions } from "@libs/tournamentForms";

const initialValues = (matchesByRound) => {
  const rounds = orderBy(Object.keys(matchesByRound), Number);
  return {
    rounds: rounds.map((r) => ({
      round: r,
      matches: matchesByRound[r],
    })),
  };
};

const SchedulingForm = ({ schedule, teams }) => {
  const matchesByRound = groupBy(schedule.matches, "round");
  const formValues = initialValues(matchesByRound);
  const teamOptions = [
    { label: "BYE", value: "Bye" },
    ...getTeamOptions(teams),
  ];
  return (
    <Form
      name="SchedulingForm"
      initialValues={formValues}
      submitButtonText="Save"
    >
      <RepeatField
        name="rounds"
        addObjectProps={{
          buttonText: `Add Round`,
          newObject: ({ value }) => {
            const maxRound =
              value.length === 0
                ? 1
                : Math.max(...value.map((v) => Number(v.round))) + 1;
            return { round: `${maxRound}`, matches: [{}] };
          },
        }}
        render={(val, { index: roundIndex }, { remove }) => {
          return (
            <Card
              key={val.round}
              title={
                <h5>
                  <b>Round {val.round}</b>
                </h5>
              }
              shadow={false}
              className="mb-3"
              actions={[
                {
                  component: <X size="25" onClick={() => remove(roundIndex)} />,
                },
              ]}
            >
              <RepeatField
                name={`rounds[${roundIndex}].matches`}
                addObjectProps={{
                  buttonText: "Add a Match",
                  newObject: () => ({}),
                }}
                render={(
                  _val,
                  { index: matchIndex },
                  { remove: removeMatch }
                ) => {
                  return (
                    <>
                      <Row key={matchIndex}>
                        <Col lg={4} md={6}>
                          <Select
                            options={teamOptions}
                            name={`rounds[${roundIndex}].matches[${matchIndex}].team1Id`}
                            label="Select Team 1"
                          />
                        </Col>
                        <Col lg={4} md={6}>
                          <Select
                            options={teamOptions}
                            name={`rounds[${roundIndex}].matches[${matchIndex}].team2Id`}
                            label="Select Team 2"
                          />
                        </Col>
                        <Col lg={4} className="d-flex justify-content-between">
                          <Text
                            name={`rounds[${roundIndex}].matches[${matchIndex}].room`}
                            label="Room"
                          />
                          <X
                            size="25"
                            onClick={() => removeMatch(matchIndex)}
                          />
                        </Col>
                      </Row>
                      <hr />
                    </>
                  );
                }}
              />
            </Card>
          );
        }}
      />
    </Form>
  );
};

export default SchedulingForm;

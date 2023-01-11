import React from "react";
import { Row, Col } from "react-bootstrap";
import orderBy from "lodash/orderBy";
import groupBy from "lodash/groupBy";

import Card from "@components/common/cards";
import {
  Form,
  RepeatField,
  Select,
  Text,
  Number as FormNumber,
} from "@components/common/forms";
import { X } from "@components/common/icon";
import { getTeamOptions } from "@libs/tournamentForms";

import NonScheduledTeams from "./NonScheduledTeams";

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
              key={roundIndex}
              shadow={false}
              className="mb-5"
              actions={[
                {
                  component: <X size="35" onClick={() => remove(roundIndex)} />,
                },
              ]}
            >
              <div className="d-flex justify-content-between">
                <FormNumber
                  name={`rounds[${roundIndex}].round`}
                  label="Round"
                />
                <X size="35" onClick={() => remove(roundIndex)} />
              </div>
              <Row>
                <Col lg={3} md={3} sm={3} xs={4}>
                  <NonScheduledTeams
                    scheduledMatches={val.matches}
                    teams={teams}
                  />
                </Col>
                <Col lg={9} md={9} sm={9} xs={8}>
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
                        <div key={matchIndex}>
                          <Row>
                            <Col
                              lg={12}
                              md={12}
                              sm={12}
                              className="mb-2 d-flex justify-content-between"
                            >
                              <b>Match {matchIndex + 1}</b>
                              <X
                                size="30"
                                onClick={() => removeMatch(matchIndex)}
                              />
                            </Col>
                            <Col lg={4} md={6} sm={6}>
                              <Select
                                options={teamOptions}
                                name={`rounds[${roundIndex}].matches[${matchIndex}].team1Id`}
                                label="Select Team 1"
                              />
                            </Col>
                            <Col lg={4} md={6} sm={6}>
                              <Select
                                options={teamOptions}
                                name={`rounds[${roundIndex}].matches[${matchIndex}].team2Id`}
                                label="Select Team 2"
                              />
                            </Col>
                            <Col lg={4} md={12} sm={12}>
                              <Text
                                name={`rounds[${roundIndex}].matches[${matchIndex}].room`}
                                label="Room"
                              />
                            </Col>
                          </Row>
                        </div>
                      );
                    }}
                  />
                </Col>
              </Row>
            </Card>
          );
        }}
      />
    </Form>
  );
};

export default SchedulingForm;

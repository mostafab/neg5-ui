import React from "react";
import Table from "react-bootstrap/Table";
import orderBy from "lodash/orderBy";
import groupBy from "lodash/groupBy";

import { Form, RepeatField, Select, Text } from "@components/common/forms";
import { X } from "@components/common/icon";
import Button from "@components/common/button";
import { getTeamOptions } from "@libs/tournamentForms";

const COLSPAN = 4;

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
            <Table responsive key={val.round} size="sm">
              <thead>
                <tr>
                  <th colSpan={COLSPAN}>
                    <div className="d-flex justify-content-between">
                      <h5>
                        <b>Round {val.round}</b>
                      </h5>
                      <X size="25" onClick={() => remove(roundIndex)} />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <RepeatField
                  name={`rounds[${roundIndex}].matches`}
                  addObjectProps={{
                    buttonText: "Add a Match",
                    newObject: () => ({}),
                    // eslint-disable-next-line react/display-name
                    as: (push) => {
                      return (
                        <tr>
                          <td colSpan={COLSPAN} className="text-end">
                            <Button type="link" onClick={() => push()}>
                              Add Match
                            </Button>
                          </td>
                        </tr>
                      );
                    },
                  }}
                  render={(
                    _val,
                    { index: matchIndex },
                    { remove: removeMatch }
                  ) => {
                    return (
                      <tr key={matchIndex}>
                        <td className="pt-4">
                          <Select
                            options={teamOptions}
                            name={`rounds[${roundIndex}].matches[${matchIndex}].team1Id`}
                            label="Select Team 1"
                          />
                        </td>
                        <td className="pt-4">
                          <Select
                            options={teamOptions}
                            name={`rounds[${roundIndex}].matches[${matchIndex}].team2Id`}
                            label="Select Team 2"
                          />
                        </td>
                        <td className="pt-4">
                          <Text
                            name={`rounds[${roundIndex}].matches[${matchIndex}].room`}
                            label="Room"
                          />
                        </td>
                        <td className="align-middle text-end">
                          <X
                            size="25"
                            onClick={() => removeMatch(matchIndex)}
                          />
                        </td>
                      </tr>
                    );
                  }}
                />
              </tbody>
            </Table>
          );
        }}
      />
    </Form>
  );
};

export default SchedulingForm;

import React from "react";
import Table from "react-bootstrap/Table";
import orderBy from "lodash/orderBy";
import groupBy from "lodash/groupBy";

import { Form, RepeatField, Select, Text } from "@components/common/forms";
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
  const teamOptions = getTeamOptions(teams);
  return (
    <Form name="SchedulingForm" initialValues={formValues}>
      <RepeatField
        name="rounds"
        render={(_val, { index }) => {
          return (
            <Table responsive key={index}>
              <thead>
                <tr>
                  <th>Round {_val.round}</th>
                </tr>
              </thead>
              <tbody>
                <RepeatField
                  name={`rounds[${index}].matches`}
                  render={(_val, { index: matchIndex }) => {
                    return (
                      <tr key={matchIndex}>
                        <td>
                          <Select
                            options={teamOptions}
                            name={`rounds[${index}].matches[${matchIndex}].team1Id`}
                            label="Select Team 1"
                          />
                        </td>
                        <td>
                          <Select
                            options={teamOptions}
                            name={`rounds[${index}].matches[${matchIndex}].team2Id`}
                            label="Select Team 2"
                          />
                        </td>
                        <td>
                          <Text
                            name={`rounds[${index}].matches[${matchIndex}].room`}
                            label="Room"
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

import React from "react";
import { Row, Col } from "react-bootstrap";
import orderBy from "lodash/orderBy";
import groupBy from "lodash/groupBy";
import * as Yup from "yup";

import Card from "@components/common/cards";
import {
  Form,
  RepeatField,
  Select,
  Text,
  Number as FormNumber,
  ResetListener,
} from "@components/common/forms";
import { X } from "@components/common/icon";
import Pill from "@components/common/pill";

import { getTeamOptionsWithPools } from "@libs/tournamentForms";

import NonScheduledTeams from "./NonScheduledTeams";

const initialValues = (matchesByRound) => {
  const rounds = orderBy(Object.keys(matchesByRound), Number);
  return {
    rounds: rounds.map((r) => ({
      round: r,
      matches: matchesByRound[r].map((m) => ({
        ...m,
        team1Id: m.team1Id === undefined ? "" : m.team1Id,
        team2Id: m.team2Id === undefined ? "" : m.team2Id,
      })),
    })),
  };
};

const validation = Yup.object({
  rounds: Yup.array().of(
    Yup.object().shape({
      round: Yup.number()
        .integer("Enter an integer")
        .positive("Enter a positive integer")
        .required("Please enter a name."),
      matches: Yup.array().of(
        Yup.object().shape({
          team1Id: Yup.string().required("Choose a team or BYE"),
          team2Id: Yup.string().required("Choose a team or BYE"),
        })
      ),
    })
  ),
});

const BYE_OPTION = {
  label: "BYE",
  value: "",
};

const getTeamPool = (team, phaseId) => {
  return team.divisions.find((d) => d.phaseId === phaseId)?.id;
};

const renderMatchPill = (scheduledMatch, phaseId, teams) => {
  const { team1Id, team2Id } = scheduledMatch;
  if (team1Id === BYE_OPTION.value || team2Id === BYE_OPTION.value) {
    return (
      <Pill type="info" className="ms-2">
        Bye
      </Pill>
    );
  }
  if (!team1Id || !team2Id) {
    return null;
  }
  const firstTeamPool = getTeamPool(
    teams.find((t) => t.id === team1Id),
    phaseId
  );
  const secondTeamPool = getTeamPool(
    teams.find((t) => t.id === team2Id),
    phaseId
  );
  if (firstTeamPool === secondTeamPool) {
    return null;
  }
  return (
    <Pill type="warning" className="ms-2">
      Cross-Pool
    </Pill>
  );
};

const SchedulingForm = ({ schedule, teams, pools }) => {
  const { matches, tournamentPhaseId } = schedule;
  const matchesByRound = groupBy(matches, "round");
  const formValues = initialValues(matchesByRound);
  const teamOptions = [
    BYE_OPTION,
    ...getTeamOptionsWithPools(teams, pools, tournamentPhaseId),
  ];
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Form
      name="SchedulingForm"
      initialValues={formValues}
      validation={validation}
      submitButtonText="Save"
      onSubmit={onSubmit}
    >
      <ResetListener
        changeKey={schedule}
        initialValues={() => initialValues(matchesByRound)}
      />
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
                <Col lg={3} md={3} sm={12} xs={12} className="mb-3">
                  <NonScheduledTeams
                    scheduledMatches={val.matches}
                    teams={teams}
                    className="sticky-top"
                  />
                </Col>
                <Col lg={9} md={9} sm={12} xs={12}>
                  <RepeatField
                    name={`rounds[${roundIndex}].matches`}
                    addObjectProps={{
                      buttonText: "Add a Match",
                      newObject: () => ({}),
                    }}
                    render={(
                      matchValue,
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
                              <span>
                                <b>Match {matchIndex + 1}</b>
                                {renderMatchPill(
                                  matchValue,
                                  tournamentPhaseId,
                                  teams
                                )}
                              </span>
                              <X
                                size="25"
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

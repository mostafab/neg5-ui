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
import Pill from "@components/common/pill";

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

const BYE_OPTION = {
  label: "BYE",
  value: "Bye",
};

const getTeamPool = (team, phaseId) => {
  return team.divisions.find((d) => d.phaseId === phaseId)?.id;
};

const renderCrossPoolPill = (scheduledMatch, phaseId, teams) => {
  const { team1Id, team2Id } = scheduledMatch;
  if (
    !team1Id ||
    !team2Id ||
    team1Id === BYE_OPTION.value ||
    team2Id === BYE_OPTION.value
  ) {
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
    <Pill type="info" className="ms-2">
      Cross-Pool
    </Pill>
  );
};

const SchedulingForm = ({
  schedule,
  teams,
  pools,
  poolTeams,
  unassignedTeams,
}) => {
  const { matches, phaseId } = schedule;
  const matchesByRound = groupBy(matches, "round");
  const formValues = initialValues(matchesByRound);
  const teamOptions = [BYE_OPTION, ...getTeamOptions(teams)];
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
                              <span>
                                <b>Match {matchIndex + 1}</b>
                                {renderCrossPoolPill(_val, phaseId, teams)}
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

import React from "react";
import { Row, Col, InputGroup } from "react-bootstrap";
import * as Yup from "yup";
import orderBy from "lodash/orderBy";

import {
  Form,
  Number,
  Text,
  Select,
  RepeatField,
  ResetListener,
  Checkbox,
} from "@components/common/forms";

const initialValues = (match) => ({
  round: match.round,
  tossupsHeard: match.tossupsHeard,
  room: match.room || "",
  moderator: match.moderator || "",
  packet: match.packet || "",
  serialId: match.serialId || "",
  notes: match.notes || "",
  teams: (match.teams || []).map((team) => ({
    teamId: team.teamId,
    score: team.score,
    overtimeTossupsGotten: team.overtimeTossupsGotten,
    bouncebackPoints: team.bouncebackPoints,
    forfeit: team.forfeit || false,
    players: (team.players || []).map((player) => ({
      playerId: player.playerId,
      tossupsHeard: player.tossupsHeard || null,
    })),
  })),
});

const validation = Yup.object({
  round: Yup.number().required().positive(),
  tossupsHeard: Yup.number().required().positive(),
  room: Yup.string(),
  packet: Yup.string(),
  serialId: Yup.string(),
  notes: Yup.string(),
});

const getTeamOptions = (teams) =>
  orderBy(
    teams.map((t) => ({
      value: t.id,
      label: t.name,
    })),
    "label"
  );

const MatchForm = ({ match, teams, rules, playersById }) => {
  const teamOptions = getTeamOptions(teams);
  const { usesBouncebacks, tossupValues } = rules;
  return (
    <Form
      name="MatchForm"
      initialValues={initialValues(match)}
      submitButtonText="Save"
      validation={validation}
      onSubmit={(values) => console.log(values)}
    >
      <ResetListener
        changeKey={match.id}
        initialValues={() => initialValues(match)}
      />
      <Row>
        <Col lg={3} md={6}>
          <Number name="round" label="Round" />
        </Col>
      </Row>
      <Row>
        <RepeatField
          name="teams"
          render={(_val, { index }) => {
            const teamLabelPrefix = `Team ${index + 1} `;
            return (
              <Col lg={6} md={12} key={index}>
                <Row>
                  <Col lg={6} sm={12} md={12} className="mb-3">
                    <Checkbox
                      name={`teams[${index}].forfeit`}
                      label={`${teamLabelPrefix} Forfeits`}
                    />
                  </Col>
                </Row>
                <Row>
                  <InputGroup>
                    <Select
                      name={`teams[${index}].teamId`}
                      label={teamLabelPrefix}
                      options={teamOptions}
                    />
                    <Number
                      name={`teams[${index}].score`}
                      label={`${teamLabelPrefix} Score`}
                    />
                  </InputGroup>
                </Row>
                <Row>
                  <Col lg={6} sm={12} md={12}>
                    <Number
                      name={`teams[${index}].overtimeTossupsGotten`}
                      label={`${teamLabelPrefix} Overtime TUs`}
                    />
                  </Col>
                  {usesBouncebacks && (
                    <Col lg={6} sm={12} md={12}>
                      <Number
                        name={`teams[${index}].bouncebackPoints`}
                        label={`${teamLabelPrefix} Bounceback Points`}
                      />
                    </Col>
                  )}
                </Row>
                <Row>
                  <p>Team { index + 1 } Players</p>
                  <RepeatField
                    name={`teams[${index}].players`}
                    render={(_val, { index: playerFieldIndex }) => {
                      const playerName = playersById[_val.playerId]?.name;
                      return (
                        <InputGroup key={playerFieldIndex} size="sm">
                          <InputGroup.Text className="w-100">
                            {playerName}
                          </InputGroup.Text>
                          <Number
                            name={`teams[${index}].players[${playerFieldIndex}].tossupsHeard`}
                            label="Tossups Heard"
                          />
                        </InputGroup>
                      );
                    }}
                  />
                </Row>
              </Col>
            );
          }}
        />
      </Row>
      <hr />
      <Row>
        <Col lg={3} md={6}>
          <Text name="moderator" label="Moderator" />
          <Text name="room" label="Room" />
          <Text name="serialId" label="Serial Id" />
        </Col>
        <Col lg={3} md={6}>
          <Number name="tossupsHeard" label="Tossups Heard" />
          <Text name="packet" label="Packet" />
        </Col>
        <Col lg={6} md={12}>
          <Text textarea name="notes" label="Notes" />
        </Col>
      </Row>
    </Form>
  );
};

export default MatchForm;

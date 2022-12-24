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

const MatchForm = ({ match, teams }) => {
  const teamOptions = getTeamOptions(teams);
  return (
    <Form
      name="MatchForm"
      initialValues={initialValues(match)}
      submitButtonText="Save"
      validation={validation}
    >
      <ResetListener
        changeKey={match.id}
        initialValues={() => initialValues(match)}
      />
      <Row>
        <RepeatField
          name="teams"
          render={(_val, { index }) => {
            const teamLabelPrefix = `Team ${index + 1} `;
            return (
              <Col lg={6} md={12} key={index}>
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
              </Col>
            );
          }}
        />
      </Row>
      <Row>
        <Col lg={3} md={6}>
          <Number name="round" label="Round" />
          <Text name="moderator" label="Moderator" />
          <Text name="room" label="Room" />
        </Col>
        <Col lg={3} md={6}>
          <Number name="tossupsHeard" label="Tossups Heard" />
          <Text name="packet" label="Packet" />
          <Text name="serialId" label="Serial Id" />
        </Col>
        <Col lg={6} md={12}>
          <Text textarea name="notes" label="Notes" />
        </Col>
      </Row>
    </Form>
  );
};

export default MatchForm;

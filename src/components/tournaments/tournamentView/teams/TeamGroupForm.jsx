import React from "react";
import * as Yup from "yup";
import times from "lodash/times";
import { Col, Row } from "react-bootstrap";

import { X } from "@components/common/icon";
import Card from "@components/common/cards";
import StateSelect from "@components/common/StateSelect";
import { Form, Text, RepeatField } from "@components/common/forms";
import TeamFields from "@components/tournaments/common/TeamFields";

const initialValues = () => ({
  name: "",
  state: "",
  teams: [{ name: "", players: times(4, () => ({ name: "", year: "" })) }],
});

const validation = Yup.object({
  name: Yup.string().required("Add a team name."),
  state: Yup.string(),
  teams: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Add a team name."),
      players: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required("Add a player name."),
        })
      ),
    })
  ),
});

const TeamGroupForm = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Form
      name="TeamGroupForm"
      initialValues={initialValues()}
      validation={validation}
      onSubmit={onSubmit}
    >
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <Text name="name" label="School / Organization Name" />
            </Col>
            <Col lg={6} md={6} sm={12}>
              <StateSelect name="state" includeNone={false} />
            </Col>
          </Row>
        </Col>
        <Col lg={12} md={12} sm={12}>
          <RepeatField
            name="teams"
            addObjectProps={{
              buttonText: "Add a Roster",
              newObject: () => ({ name: "", players: [] }),
            }}
            render={(_val, { index }, { remove }) => {
              return (
                <Card
                  title={`Roster ${index + 1}`}
                  key={index}
                  className="mb-3"
                  shadow={false}
                  actions={[
                    {
                      component: <X onClick={() => remove(index)} size="30" />,
                    },
                  ]}
                >
                  <TeamFields fieldNamePrefix={`teams[${index}].`} />
                </Card>
              );
            }}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default TeamGroupForm;

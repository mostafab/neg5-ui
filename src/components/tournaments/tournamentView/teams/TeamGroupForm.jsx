import React from "react";

import { Col, Row } from "react-bootstrap";

import { X } from "@components/common/icon";
import Card from "@components/common/cards";
import StateSelect from "@components/common/StateSelect";
import { Form, Text, RepeatField } from "@components/common/forms";

const initialValues = () => ({
  name: "",
  state: "",
  teams: [{ name: "", players: [] }],
});

const TeamGroupForm = () => {
  return (
    <Form name="TeamGroupForm" initialValues={initialValues()}>
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
              buttonText: "Add another Team",
              newObject: () => ({ name: "", players: [] }),
            }}
            render={(_val, { index }, { remove }) => {
              return (
                <Card
                  title={`Team ${index + 1}`}
                  key={index}
                  className="mb-3"
                  shadow={false}
                  actions={[
                    {
                      component: <X onClick={() => remove(index)} size="30" />,
                    },
                  ]}
                >
                  <Row>
                    <Col lg={6}>
                      <Text name={`teams[${index}].name`} label="Team Name" />
                    </Col>
                  </Row>
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

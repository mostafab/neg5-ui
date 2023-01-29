import React, { useState, useContext } from "react";
import * as Yup from "yup";
import times from "lodash/times";
import { Col, Row } from "react-bootstrap";

import { doValidatedApiRequest } from "@api/common";
import { createTeamGroup } from "@api/team";
import { sanitizeFormValuesRecursive } from "@libs/forms";
import { useAppDispatch } from "@store";
import { teamGroupCreatedOrUpdated } from "@features/tournamentView/teamsSlice";

import { X } from "@components/common/icon";
import Card from "@components/common/cards";
import CommonErrorBanner from "@components/common/errors/CommonErrorBanner";
import StateSelect from "@components/common/StateSelect";
import { Form, Text, RepeatField } from "@components/common/forms";
import { TournamentIdContext } from "@components/tournaments/common/context";
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
  const [submitData, setSubmitData] = useState({
    submitting: false,
    error: null,
  });
  const dispatch = useAppDispatch();
  const tournamentId = useContext(TournamentIdContext);
  const onSubmit = async (values, { resetForm }) => {
    setSubmitData({
      submitting: true,
      error: null,
    });
    const payload = sanitizeFormValuesRecursive(values);
    payload.tournamentId = tournamentId;

    const response = await doValidatedApiRequest(() =>
      createTeamGroup(payload)
    );
    if (response.errors) {
      setSubmitData({
        error: response.errors,
        submitting: false,
      });
    } else {
      setSubmitData({
        submitting: false,
      });
      resetForm({ values: initialValues() });
      dispatch(teamGroupCreatedOrUpdated(response));
    }
  };
  return (
    <Form
      name="TeamGroupForm"
      initialValues={initialValues()}
      validation={validation}
      onSubmit={onSubmit}
      submitting={submitData.submitting}
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
              newObject: () => initialValues().teams[0],
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
      {submitData.error && <CommonErrorBanner errors={submitData.error} />}
    </Form>
  );
};

export default TeamGroupForm;

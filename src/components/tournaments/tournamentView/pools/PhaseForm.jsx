import React, { useState, useContext } from "react";
import * as Yup from "yup";
import InputGroup from "react-bootstrap/InputGroup";

import { Form, Text } from "@components/common/forms";
import Button from "@components/common/button";
import CommonErrorBanner from "@components/common/errors/CommonErrorBanner";
import { TournamentIdContext } from "@components/tournaments/common/context";

import { useAppDispatch } from "@store";
import { createPhase } from "@api/phase";
import { doValidatedApiRequest } from "@api/common";
import { phaseCreated } from "@features/tournamentView/phasesSlice";

import { sanitizeFormValues } from "@libs/forms";

const initialValues = (phase) => ({
  name: phase?.name || "",
  id: phase?.id || "",
});

const validation = Yup.object({
  name: Yup.string().required("Please enter a name."),
});

const PhaseForm = ({ phase, onSubmitSuccess }) => {
  const dispatch = useAppDispatch();
  const [submitData, setSubmitData] = useState({
    submitting: false,
    error: null,
  });
  const tournamentId = useContext(TournamentIdContext);
  const onSubmit = async (values, { resetForm }) => {
    setSubmitData({
      submitting: true,
      error: null,
    });
    const requestBody = sanitizeFormValues({ ...values, tournamentId });
    const payload = await doValidatedApiRequest(() => {
      return createPhase(requestBody);
    });
    if (payload.errors) {
      setSubmitData({
        submitting: false,
        error: payload.errors,
      });
    } else {
      setSubmitData({
        submitting: false,
      });
      dispatch(phaseCreated(payload));
      resetForm({ values: initialValues(phase) });
      onSubmitSuccess && onSubmitSuccess(payload);
    }
  };
  return (
    <>
      <Form
        name="PhaseForm"
        customCtaButtons
        initialValues={initialValues(phase)}
        validation={validation}
        onSubmit={onSubmit}
      >
        <InputGroup>
          <Text name="name" label="Add a Phase" />
          <Button
            className="mb-3"
            type="primary"
            disabled={submitData.submitting}
            submit
          >
            {submitData.submitting ? "Saving" : "Save"}
          </Button>
        </InputGroup>
      </Form>
      {submitData.error && <CommonErrorBanner errors={submitData.error} />}
    </>
  );
};

export default PhaseForm;

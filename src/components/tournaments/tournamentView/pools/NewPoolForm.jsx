import React, { useState } from "react";
import * as Yup from "yup";
import InputGroup from "react-bootstrap/InputGroup";

import { Form, Text } from "@components/common/forms";
import Button from "@components/common/button";
import CommonErrorBanner from "@components/common/errors/CommonErrorBanner";

import { useAppDispatch } from "@store";
import { createPool } from "@api/pool";
import { doValidatedApiRequest } from "@api/common";
import { poolCreated } from "@features/tournamentView/phasesSlice";

import { sanitizeFormValues } from "@libs/forms";

const initialValues = (phaseId) => ({
  name: "",
  phaseId,
});

const validation = Yup.object({
  name: Yup.string().required("Please enter a name."),
});

const NewPoolForm = ({ className = "", phaseId }) => {
  const [submitData, setSubmitData] = useState({
    submitting: false,
    error: null,
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (values, { resetForm }) => {
    setSubmitData({
      submitting: true,
      error: null,
    });
    const payload = await doValidatedApiRequest(() => {
      return createPool(sanitizeFormValues(values));
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
      dispatch(poolCreated(payload));
      resetForm({ values: initialValues(phaseId) });
    }
  };

  return (
    <div className={className}>
      <Form
        name="NewPoolForm"
        initialValues={initialValues(phaseId)}
        validation={validation}
        onSubmit={onSubmit}
        customCtaButtons
      >
        <InputGroup>
          <Text name="name" label="Add a Pool" />
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
    </div>
  );
};

export default NewPoolForm;

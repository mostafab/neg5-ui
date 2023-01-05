import React, { useContext, useState } from "react";
import { object as yupObject } from "yup";

import { useAppDispatch } from "@store";
import { informationUpdated } from "@features/tournamentView/tournamentInfoSlice";
import { updateBasicInformation } from "@api/tournaments";
import { doValidatedApiRequest } from "@api/common";

import { Form, Checkbox } from "@components/common/forms";
import CommonErrorBanner from "@components/common/errors/CommonErrorBanner";
import TournamentInfoFields, {
  validation,
} from "@components/tournaments/common/TournamentInfoFields";
import { TournamentIdContext } from "@components/tournaments/common/context";

import { sanitizeFormValuesRecursive } from "@libs/forms";

const initialValues = (tournamentInfo) => tournamentInfo;
const formValidation = yupObject(validation());

const TournamentInfoForm = ({ tournamentInfo, onSubmitSuccess = null }) => {
  const [submitData, setSubmitData] = useState({
    error: null,
    submitting: false,
  });
  const dispatch = useAppDispatch();
  const tournamentId = useContext(TournamentIdContext);
  const onSubmit = async (values) => {
    const payload = sanitizeFormValuesRecursive(values);
    setSubmitData({
      submitting: true,
      error: null,
    });
    const response = await doValidatedApiRequest(() =>
      updateBasicInformation(tournamentId, payload)
    );
    if (response.errors) {
      setSubmitData({
        submitting: false,
        error: response.errors,
      });
    } else {
      setSubmitData({
        submitting: false,
      });
      dispatch(informationUpdated(response));
      onSubmitSuccess && onSubmitSuccess();
    }
  };

  return (
    <Form
      name="TournamentInfoForm"
      initialValues={initialValues(tournamentInfo)}
      validation={formValidation}
      onSubmit={onSubmit}
      submitting={submitData.submitting}
    >
      <Checkbox name="hidden" label="Hidden" />
      <TournamentInfoFields />
      {submitData.error && <CommonErrorBanner errors={submitData.error} />}
    </Form>
  );
};

export default TournamentInfoForm;

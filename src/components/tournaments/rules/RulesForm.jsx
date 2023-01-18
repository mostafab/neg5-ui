import React, { useContext, useState } from "react";
import { object as yupObject } from "yup";

import { useAppDispatch } from "@store";
import { rulesUpdated } from "@features/tournamentView/rulesSlice";
import { updateRules } from "@api/rules";
import { doValidatedApiRequest } from "@api/common";
import { Events } from "@libs/liveEvents";

import { Form } from "@components/common/forms";
import CommonErrorBanner from "@components/common/errors/CommonErrorBanner";
import ScoringRulesField, {
  validation,
} from "@components/tournaments/common/ScoringRulesFields";
import {
  TournamentIdContext,
  TournamentLiveChangesContext,
} from "@components/tournaments/common/context";

import { sanitizeFormValuesRecursive } from "@libs/forms";

const initialValues = (rules) => rules;
const formValidation = yupObject(validation());

const RulesForm = ({ rules, onSubmitSuccess = null }) => {
  const [submitData, setSubmitData] = useState({
    error: null,
    submitting: false,
  });
  const dispatch = useAppDispatch();
  const tournamentId = useContext(TournamentIdContext);
  const liveUpdatesContext = useContext(TournamentLiveChangesContext);
  const onSubmit = async (values) => {
    const payload = sanitizeFormValuesRecursive(values);
    setSubmitData({
      submitting: true,
      error: null,
    });
    const response = await doValidatedApiRequest(() =>
      updateRules(tournamentId, payload)
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
      dispatch(rulesUpdated(response));
      onSubmitSuccess && onSubmitSuccess();
      liveUpdatesContext.trigger(Events.rules.updated, response);
    }
  };

  return (
    <Form
      name="RulesForm"
      initialValues={initialValues(rules)}
      validation={formValidation}
      onSubmit={onSubmit}
      submitting={submitData.submitting}
    >
      <ScoringRulesField />
      {submitData.error && <CommonErrorBanner errors={submitData.error} />}
    </Form>
  );
};

export default RulesForm;

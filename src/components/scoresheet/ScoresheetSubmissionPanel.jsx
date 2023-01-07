import React, { useState, useEffect } from "react";
import keyBy from "lodash/keyBy";
import pick from "lodash/pick";

import { useAppDispatch } from "@store";
import { matchCreatedOrUpdated } from "@features/tournamentView/matchesSlice";
import { doValidatedApiRequest } from "@api/common";
import { convertScoresheet, submitScoresheet } from "@api/scoresheet";
import { sanitizeFormValuesRecursive } from "@libs/forms";

import Card from "@components/common/cards";
import { Info } from "@components/common/alerts";
import { X, Spinner } from "@components/common/icon";
import MatchForm from "@components/tournaments/tournamentView/matches/MatchForm";

import ScoresheetSubmittedCard from "./ScoresheetSubmittedCard";

const editableMatchFormFields = [
  "round",
  "moderator",
  "room",
  "packet",
  "serialId",
  "phases",
  "notes",
  "isTiebreaker",
];

const ScoresheetSubmissionPanel = ({
  startValues,
  scoresheetState,
  onCancel,
  teams,
  rules,
  phases,
  onViewCreatedMatch,
}) => {
  const [conversionData, setConversionData] = useState({
    data: null,
    loading: false,
  });
  const [createdData, setCreatedData] = useState(null);
  useEffect(() => {
    loadConversionData();
  }, []);
  const dispatch = useAppDispatch();

  const loadConversionData = async () => {
    setConversionData({
      loading: true,
    });
    const response = await doValidatedApiRequest(() =>
      convertScoresheet({
        ...sanitizeFormValuesRecursive(startValues),
        ...scoresheetState,
      })
    );
    setConversionData({
      data: response,
      loading: false,
    });
  };

  const onSubmit = async (matchFormValues, _actions, setFormSubmitData) => {
    const editableFields = pick(matchFormValues, editableMatchFormFields);
    const scoresheetPayload = {
      ...sanitizeFormValuesRecursive(startValues),
      ...sanitizeFormValuesRecursive(editableFields),
      ...scoresheetState,
    };
    setFormSubmitData({
      submitting: true,
      error: null,
    });
    const response = await doValidatedApiRequest(() =>
      submitScoresheet(scoresheetPayload)
    );
    setFormSubmitData({
      submitting: false,
      error: response.errors,
    });
    if (!response.errors) {
      dispatch(matchCreatedOrUpdated({ match: response }));
      setCreatedData(response);
    }
  };

  const { loading, data } = conversionData;
  const playersById = keyBy(
    teams.flatMap((t) => t.players),
    "id"
  );
  if (createdData) {
    return (
      <ScoresheetSubmittedCard
        onView={() => onViewCreatedMatch(createdData.id)}
      />
    );
  }
  return (
    <Card
      title="Submit Scoresheet"
      actions={[
        {
          component: <X onClick={onCancel} size="30" />,
        },
      ]}
    >
      {loading && (
        <div className="p-5 d-flex justify-content-center text-dark">
          <div className="mb-2">Converting Scoresheet</div>
          <Spinner className="mt-1 ms-2" />
        </div>
      )}
      {!loading && data && (
        <>
          <Info>
            Please take a moment to verify the below information is correct. If
            everything looks good, go ahead and submit! Otherwise, please go
            back and fix any issues before submitting.
          </Info>
          <MatchForm
            stacked
            readOnly
            match={data}
            teams={teams}
            rules={rules}
            phases={phases}
            playersById={playersById}
            onSubmit={onSubmit}
            editableFields={editableMatchFormFields}
          />
        </>
      )}
    </Card>
  );
};

export default ScoresheetSubmissionPanel;

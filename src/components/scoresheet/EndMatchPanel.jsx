import React, { useState, useEffect } from "react";
import keyBy from "lodash/keyBy";

import { doValidatedApiRequest } from "@api/common";
import { convertScoresheet } from "@api/scoresheet";
import { sanitizeFormValuesRecursive } from "@libs/forms";

import Card from "@components/common/cards";
import { Info } from "@components/common/alerts";
import { X, Spinner } from "@components/common/icon";

import MatchForm from "@components/tournaments/tournamentView/matches/MatchForm";

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

const EndMatchPanel = ({
  startValues,
  scoresheetState,
  onCancel,
  onSubmit,
  teams,
  rules,
  phases,
}) => {
  const [conversionData, setConversionData] = useState({
    data: null,
    loading: false,
  });

  const loadConversionData = async () => {
    setConversionData({
      loading: true,
    });
    const payload = {
      ...sanitizeFormValuesRecursive(startValues),
      ...scoresheetState,
    };
    const response = await doValidatedApiRequest(() =>
      convertScoresheet(payload)
    );
    setConversionData({
      data: response,
      loading: false,
    });
  };
  useEffect(() => {
    loadConversionData();
  }, []);

  const { loading, data } = conversionData;
  const playersById = keyBy(
    teams.flatMap((t) => t.players),
    "id"
  );
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
            Please take a moment to verify this information is correct. If
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

export default EndMatchPanel;

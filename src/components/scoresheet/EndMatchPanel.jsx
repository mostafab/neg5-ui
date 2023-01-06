import React, { useState, useEffect } from "react";

import { doValidatedApiRequest } from "@api/common";
import { convertScoresheet } from "@api/scoresheet";

import Card from "@components/common/cards";
import { Info } from "@components/common/alerts";
import { X, Spinner } from "@components/common/icon";

const EndMatchPanel = ({ startValues, scoresheetState, onCancel }) => {
  const [conversionData, setConversionData] = useState({
    data: null,
    loading: false,
  });

  const loadConversionData = async () => {
    setConversionData({
      loading: true,
    });
    const payload = {
      ...startValues,
      ...scoresheetState,
    };
    const response = await doValidatedApiRequest(() =>
      convertScoresheet(payload)
    );
    console.log(response);
    setConversionData({
      data: response,
      loading: false,
    });
  };
  useEffect(() => {
    loadConversionData();
  }, []);

  const { loading, data } = conversionData;
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
        <Info>
          Please take a moment to validate this information. If everything looks
          good, go ahead and submit! Otherwise, please go back and fix any
          issues before submitting.
        </Info>
      )}
    </Card>
  );
};

export default EndMatchPanel;

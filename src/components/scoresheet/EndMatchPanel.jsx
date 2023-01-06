import React, { useState, useEffect } from "react";

import Card from "@components/common/cards";
import { Info } from "@components/common/alerts";
import { X, Spinner } from "@components/common/icon";

const EndMatchPanel = ({
  scoresheetStartValues,
  scoresheetState,
  onCancel,
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("loading...");
  }, []);
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
      {!loading && (
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

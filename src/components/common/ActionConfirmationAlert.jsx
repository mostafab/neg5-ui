import React from "react";

import Alert from "@components/common/alerts";
import Button from "@components/common/button";

const ActionConfirmationAlert = ({
  level,
  onConfirm,
  onCancel,
  message,
  className = "",
  submitting = false,
}) => (
  <div>
    <Alert level={level} className={className}>
      <div className="d-lg-flex d-md-block justify-content-between">
        <div className="pt-1 mb-2">{message}</div>
        <div className="d-flex justify-content-end">
          <Button
            type="secondary"
            className="me-3 shadow-sm"
            onClick={onCancel}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            submitting={submitting}
            type="primary shadow-sm"
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Alert>
  </div>
);

export default ActionConfirmationAlert;

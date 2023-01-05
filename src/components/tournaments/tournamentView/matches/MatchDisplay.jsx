import React, { useState, useEffect } from "react";

import { useAppDispatch } from "@store";
import { matchDeleted } from "@features/tournamentView/matchesSlice";
import { deleteMatch } from "@api/match";
import { doValidatedApiRequest } from "@api/common";

import { formatAddedAtDate } from "@libs/dates";
import DropdownActions from "@components/common/DropdownActions";
import Card from "@components/common/cards";
import ActionConfirmationAlert from "@components/common/ActionConfirmationAlert";
import CommonErrorBanner from "@components/common/errors/CommonErrorBanner";

import MatchForm from "./MatchForm";

const MatchDisplay = ({
  selectedMatch,
  teams,
  rules,
  playersById,
  phases,
  onSubmitSuccess,
  onDeleteSuccess,
}) => {
  const match = selectedMatch;
  const [readOnly, setReadOnly] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [submitData, setSubmitData] = useState({
    submitting: false,
    error: null,
  });
  useEffect(() => {
    setIsDeleting(false);
    setSubmitData({
      error: null,
      submitting: false,
    });
  }, [match.id]);

  const dispatch = useAppDispatch();
  const onConfirmDelete = async () => {
    setSubmitData({
      error: null,
      submitting: true,
    });
    const response = await doValidatedApiRequest(() => deleteMatch(match.id));
    if (response.errors) {
      setSubmitData({
        error: response.errors,
        submitting: false,
      });
    } else {
      setSubmitData({
        submitting: false,
      });
      dispatch(matchDeleted({ matchId: match.id }));
      onDeleteSuccess({ id: match.id });
    }
  };

  return (
    <Card>
      {match.id && !isDeleting && (
        <div className="mb-3 d-flex justify-content-between">
          {readOnly && !isDeleting && (
            <DropdownActions
              actions={[
                {
                  label: <span className="text-gray">Edit</span>,
                  onClick: () => setReadOnly(false),
                  separator: <hr className="mt-1 mb-1" />,
                },
                {
                  label: <span className="text-danger">Delete Match</span>,
                  onClick: () => setIsDeleting(true),
                },
              ]}
            />
          )}
          {match.addedAt && (
            <span className="small text-dark">
              Added {formatAddedAtDate(match.addedAt)}
            </span>
          )}
        </div>
      )}
      {isDeleting && (
        <>
          <ActionConfirmationAlert
            level="danger"
            message="Are you sure you want to delete this match? This action is unrecoverable."
            onCancel={() => {
              setIsDeleting(false);
              setSubmitData({
                error: null,
                submitting: false,
              });
            }}
            onConfirm={onConfirmDelete}
            submitting={submitData.submitting}
          />
          {submitData.error && <CommonErrorBanner errors={submitData.error} />}
        </>
      )}
      <MatchForm
        match={match}
        teams={teams}
        rules={rules}
        playersById={playersById}
        phases={phases}
        readOnly={readOnly && match.id}
        onCancel={() => setReadOnly(true)}
        onSubmitSuccess={(result) => {
          setReadOnly(true);
          onSubmitSuccess && onSubmitSuccess(result);
        }}
      />
    </Card>
  );
};

export default MatchDisplay;

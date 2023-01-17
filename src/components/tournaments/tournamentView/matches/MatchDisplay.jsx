import React, { useState, useEffect } from "react";

import { useAppDispatch } from "@store";
import { matchDeleted } from "@features/tournamentView/matchesSlice";
import { deleteMatch } from "@api/match";
import { getScoresheet } from "@api/scoresheet";
import { doValidatedApiRequest } from "@api/common";

import { formatAddedAtDate } from "@libs/dates";
import DropdownActions from "@components/common/DropdownActions";
import Card from "@components/common/cards";
import Button from "@components/common/button";
import ActionConfirmationAlert from "@components/common/ActionConfirmationAlert";
import CommonErrorBanner from "@components/common/errors/CommonErrorBanner";
import ScoresheetTable from "@components/scoresheet/ScoresheetTable";

import MatchForm from "./MatchForm";

const MatchDisplay = ({
  selectedMatch,
  teams,
  rules,
  playersById,
  phases,
  onSubmitSuccess,
  onDeleteSuccess,
  editable,
}) => {
  const match = selectedMatch;
  const [readOnly, setReadOnly] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [scoresheetData, setScoresheetData] = useState(null);
  const [viewScoresheet, setViewScoresheet] = useState(false);
  const [submitData, setSubmitData] = useState({
    submitting: false,
    error: null,
  });
  useEffect(() => {
    setViewScoresheet(false);
    setIsDeleting(false);
    setSubmitData({
      error: null,
      submitting: false,
    });
    reloadScoresheet();
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

  const reloadScoresheet = async () => {
    setScoresheetData(null);
    if (!match.scoresheetId) {
      return;
    }
    const scoresheetData = await doValidatedApiRequest(() =>
      getScoresheet(match.scoresheetId)
    );
    if (!scoresheetData.errors) {
      setScoresheetData(scoresheetData);
    }
  };

  let actions = editable
    ? [
        {
          label: "Edit",
          onClick: () => setReadOnly(false),
          separator: match.scoresheetId ? null : <hr className="mt-1 mb-1" />,
        },
        {
          label: <span className="text-danger">Delete Match</span>,
          onClick: () => setIsDeleting(true),
        },
      ]
    : [];
  if (scoresheetData) {
    actions =
      actions.length > 0
        ? [
            actions[0],
            {
              label: "View Scoresheet",
              onClick: () => setViewScoresheet(true),
              separator: <hr className="mt-1 mb-1" />,
            },
            actions[1],
          ]
        : [
            {
              label: "View Scoresheet",
              onClick: () => setViewScoresheet(true),
              separator:
                actions.length > 0 ? <hr className="mt-1 mb-1" /> : null,
            },
          ];
  }
  return (
    <Card>
      {match.id && !isDeleting && !viewScoresheet && (
        <div className="mb-3 d-flex justify-content-between">
          {readOnly && !isDeleting && <DropdownActions actions={actions} />}
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
      {!viewScoresheet && (
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
      )}
      {viewScoresheet && scoresheetData && (
        <>
          <Button
            className="mb-3"
            type="outline-secondary"
            onClick={() => setViewScoresheet(false)}
          >
            Back
          </Button>
          <ScoresheetTable
            {...scoresheetData}
            rules={rules}
            teams={teams.filter((t) => {
              return match.teams.some((matchTeam) => matchTeam.teamId === t.id);
            })}
            inCard={false}
            readOnly
          />
        </>
      )}
    </Card>
  );
};

export default MatchDisplay;

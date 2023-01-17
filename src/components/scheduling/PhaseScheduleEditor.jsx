import React, { useState } from "react";

import { doValidatedApiRequest } from "@api/common";
import { generateSchedule } from "@api/schedule";

import Button from "@components/common/button";
import { Spinner, Edit } from "@components/common/icon";

import SchedulingForm from "./SchedulingForm";

const PhaseScheduleEditor = ({
  phase,
  teams,
  schedule = null,
  pools,
  poolTeams,
  unassignedTeams,
  editable,
}) => {
  const [draft, setDraft] = useState(schedule);
  const [generating, setGenerating] = useState(false);
  const [readOnly, setReadOnly] = useState(schedule ? true : false);
  const onNew = (e) => {
    e.preventDefault();
    setDraft({
      tournamentPhaseId: phase.id,
      matches: [
        {
          round: 1,
          team1Id: null,
          team2Id: null,
        },
      ],
    });
    setReadOnly(false);
  };

  const onGenerate = async (e) => {
    e.preventDefault();
    setGenerating(true);
    setDraft(null);
    const response = await doValidatedApiRequest(() =>
      generateSchedule({ tournamentPhaseId: phase.id })
    );
    setGenerating(false);
    if (!response.errors) {
      setDraft(response);
      setReadOnly(false);
    }
  };

  if (!draft) {
    return (
      <div className="p-4 text-center">
        {!generating && (
          <div>
            <div>No schedule has been created for this phase.</div>
            {editable && (
              <>
                <a href="#" onClick={onNew}>
                  Start from scratch
                </a>
                or
                <a href="#" onClick={onGenerate}>
                  have one pre-populated
                </a>{" "}
                from existing pools.
              </>
            )}
          </div>
        )}
        {generating && <Spinner size={25} />}
      </div>
    );
  }
  return (
    <>
      {!readOnly && !draft.id && (
        <Button type="link" onClick={onGenerate}>
          Re-Generate
        </Button>
      )}
      {readOnly && editable && (
        <div className="text-end p-2">
          <Edit size="20" onClick={() => setReadOnly(false)} />
        </div>
      )}
      <div>
        <SchedulingForm
          schedule={draft}
          teams={teams}
          pools={pools}
          poolTeams={poolTeams}
          unassignedTeams={unassignedTeams}
          readOnly={readOnly}
          onCancel={() => {
            setReadOnly(true);
            if (!draft.id) {
              setDraft(null);
            }
          }}
          onSubmitSuccess={(response) => {
            setReadOnly(true);
            setDraft(response);
          }}
        />
      </div>
    </>
  );
};

export default PhaseScheduleEditor;

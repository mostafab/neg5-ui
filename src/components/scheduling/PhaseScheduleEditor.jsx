import React, { useState } from "react";

import { doValidatedApiRequest } from "@api/common";
import { generateSchedule } from "@api/schedule";

import Button from "@components/common/button";
import { Spinner } from "@components/common/icon";

import SchedulingForm from "./SchedulingForm";

const PhaseScheduleEditor = ({
  phase,
  teams,
  schedule = null,
  pools,
  poolTeams,
  unassignedTeams,
}) => {
  const [draft, setDraft] = useState(schedule);
  const [generating, setGenerating] = useState(false);
  const onNew = (e) => {
    e.preventDefault();
    setDraft({
      phaseId: phase.id,
      matches: [
        {
          round: 1,
          team1Id: null,
          team2Id: null,
        },
      ],
    });
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
    }
  };

  if (!draft) {
    return (
      <div className="p-4 text-center">
        {!generating && (
          <>
            <div>No schedule has been created for this phase.</div>
            <a href="#" onClick={onNew}>
              Start from scratch
            </a>{" "}
            or{" "}
            <a href="#" onClick={onGenerate}>
              have one pre-populated
            </a>{" "}
            from existing pools.
          </>
        )}
        {generating && <Spinner size={25} />}
      </div>
    );
  }
  return (
    <>
      <Button type="link" onClick={onGenerate}>
        Re-Generate
      </Button>
      <div>
        <SchedulingForm
          schedule={draft}
          teams={teams}
          pools={pools}
          poolTeams={poolTeams}
          unassignedTeams={unassignedTeams}
        />
      </div>
    </>
  );
};

export default PhaseScheduleEditor;

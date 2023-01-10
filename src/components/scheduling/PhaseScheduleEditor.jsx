import React, { useState, useContext } from "react";

import { doValidatedApiRequest } from "@api/common";
import { generateSchedule } from "@api/schedule";

import { Spinner } from "@components/common/icon";
import { TournamentIdContext } from "@components/tournaments/common/context";

const PhaseScheduleEditor = ({ phase, teams, schedule = null }) => {
  const [draft, setDraft] = useState(schedule);
  const [generating, setGenerating] = useState(false);
  const tournamentId = useContext(TournamentIdContext);

  const onNew = (e) => {
    e.preventDefault();
    console.log("new schedule");
  };

  const onGenerate = async (e) => {
    e.preventDefault();
    setGenerating(true);
    const response = await doValidatedApiRequest(() =>
      generateSchedule({ phaseId: phase.id, tournamentId })
    );
    setGenerating(false);
    console.log(response);
  };

  if (!schedule) {
    return (
      <div className="p-4 text-center">
        {!generating && (
          <>
            <div>No schedule has been created for this phase yet.</div>
            <a href="#" onClick={onNew}>
              Start from scratch
            </a>{" "}
            or{" "}
            <a href="#" onClick={onGenerate}>
              have one generated
            </a>{" "}
            from existing pools.
          </>
        )}
        {generating && <Spinner size={25} />}
      </div>
    );
  }
  return <div>Stuff</div>;
};

export default PhaseScheduleEditor;

import React, { useState } from "react";

const PhaseScheduleContent = ({ phase, teams, schedule = null }) => {
  const [draft, setDraft] = useState(schedule);

  if (!draft) {
    return (
      <div className="p-4 text-center">
        <div>No schedule has been created for this phase yet.</div>
        <a href="#">Start from scratch</a> or <a href="#">have one generated</a>{" "}
        from existing pools.
      </div>
    );
  }
  return <div>Stuff</div>;
};

export default PhaseScheduleContent;

import React from "react";

import Card from "@components/common/cards";
import { Spinner } from "@components/common/icon";
import Pill from "@components/common/pill";

import ScoresheetsList from "@components/scoresheet/ScoresheetsList";

const InProgressMatchesPanel = ({ draftScoresheets, teams, currentUser }) => {
  return (
    <Card shadow={false} title="In-progress Matches" className="mb-3">
      <Pill type="info" className="mb-2">
        {draftScoresheets.length}{" "}
        {draftScoresheets.length === 1 ? "match" : "matches"} in progress
      </Pill>
      <div style={{ maxHeight: "75vh", overflow: "scroll" }}>
        <ScoresheetsList
          scoresheets={draftScoresheets}
          teams={teams}
          currentUser={currentUser}
          filter={false}
          draftIcon={Spinner}
        />
      </div>
    </Card>
  );
};

export default InProgressMatchesPanel;

import React, { useState } from "react";
import orderBy from "lodash/orderBy";

import Card from "@components/common/cards";
import Pill from "@components/common/pill";
import Modal from "@components/common/modal";

import ScoresheetTable from "@components/scoresheet/ScoresheetTable";
import ScoresheetsList, {
  scoresheetTitle,
} from "@components/scoresheet/ScoresheetsList";

const InProgressMatchesPanel = ({
  draftScoresheets,
  teams,
  currentUser,
  rules,
}) => {
  const [selected, setSelected] = useState(null);
  const scoresheetTeams = selected
    ? orderBy(
        teams.filter(
          (t) => t.id === selected.team1Id || t.id === selected.team2Id
        ),
        (t) => (t.id === selected.team1Id ? 0 : 1)
      )
    : [];
  return (
    <>
      {selected && (
        <Modal
          size="xl"
          onHide={() => setSelected(null)}
          title={scoresheetTitle(teams, selected)}
        >
          <ScoresheetTable
            {...selected}
            teams={scoresheetTeams}
            rules={rules}
            readOnly
          />
        </Modal>
      )}
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
            onSelect={(s) => setSelected(s)}
          />
        </div>
      </Card>
    </>
  );
};

export default InProgressMatchesPanel;

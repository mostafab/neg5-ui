import React, { useState, useEffect } from "react";
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
  useEffect(() => {
    if (!selected) {
      return;
    }
    const match = draftScoresheets.find((d) => d.id === selected.id);
    if (match && match.lastUpdatedAt !== selected.lastUpdatedAt) {
      setSelected(match);
    }
  }, [draftScoresheets]);
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
        <ScoresheetsList
          scoresheets={draftScoresheets}
          teams={teams}
          currentUser={currentUser}
          filter={false}
          onSelect={(s) => setSelected(s)}
          maxHeight="75vh"
        />
      </Card>
    </>
  );
};

export default InProgressMatchesPanel;

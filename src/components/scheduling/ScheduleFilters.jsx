import React, { useState } from "react";
import uniq from "lodash/uniq";

import { getTeamOptions } from "@libs/tournamentForms";

import { Select, Form } from "@components/common/forms";

const ScheduleFilters = ({ teams, matches, onChange }) => {
  const [filtersState, setFiltersState] = useState({
    rooms: [],
    rounds: [],
    teams: [],
  });
  const teamOptions = getTeamOptions(teams);
  const uniqueRooms = uniq(
    matches.filter((m) => m.room).map((m) => m.room)
  ).map((room) => ({
    label: room,
    value: room,
  }));
  const uniqueRounds = uniq(matches.map((m) => m.round)).map((r) => ({
    value: r,
    label: r,
  }));
  const internalOnChange = (name) => (value) => {
    const nextState = {
      ...filtersState,
      [name]: value,
    };
    setFiltersState(nextState);
    onChange(nextState);
  };
  return (
    <Form name="ScheduleFilters" customCtaButtons>
      <Select
        name="teams"
        multiple
        options={teamOptions}
        label="Teams"
        onChange={internalOnChange("teams")}
        searchable
      />
      <Select
        name="rounds"
        multiple
        options={uniqueRounds}
        label="Rounds"
        onChange={internalOnChange("rounds")}
      />
      {uniqueRooms.length > 0 && (
        <Select
          name="rooms"
          multiple
          options={uniqueRooms}
          label="Rooms"
          onChange={internalOnChange("rooms")}
          searchable
        />
      )}
    </Form>
  );
};

export default ScheduleFilters;

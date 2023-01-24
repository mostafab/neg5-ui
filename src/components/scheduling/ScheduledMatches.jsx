import React, { useState } from "react";
import { ListGroup, Row, Col } from "react-bootstrap";

import keyBy from "lodash/keyBy";
import orderBy from "lodash/orderBy";
import uniq from "lodash/uniq";

import { getTeamOptions } from "@libs/tournamentForms";

import { Select, Form } from "@components/common/forms";

const ScheduleFilters = ({ teams, matches, onChange }) => {
  const filtersState = useState({
    rooms: [],
    teams: [],
  });
  const teamOptions = getTeamOptions(teams);
  const uniqueRooms = uniq(
    matches.filter((m) => m.room).map((m) => m.room)
  ).map((room) => ({
    label: room,
    value: room,
  }));
  const internalOnChange = (name) => (value) => {
    console.log(value);
  };
  return (
    <Form name="ScheduleFilters" customCtaButtons>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Select
            name="teams"
            multiple
            options={teamOptions}
            label="Teams"
            onChange={internalOnChange("teams")}
          />
        </Col>
        <Col lg={12} md={12} sm={12}>
          <Select
            name="rooms"
            multiple
            options={uniqueRooms}
            label="Rooms"
            onChange={internalOnChange("rooms")}
          />
        </Col>
      </Row>
    </Form>
  );
};

const ScheduledMatches = ({ matches, teams, onSelect }) => {
  const teamsById = keyBy(teams, "id");

  const getMatchTitle = ({ team1Id, team2Id, round, room }) => {
    return (
      <div>
        Round {round}: {teamsById[team1Id]?.name} vs {teamsById[team2Id]?.name}
        {room && <div className="small text-dark mt-2">{room}</div>}
      </div>
    );
  };
  return (
    <>
      <ScheduleFilters teams={teams} matches={matches} />
      <ListGroup className="overflow-scroll" style={{ maxHeight: "75vh" }}>
        {orderBy(matches, "round").map((m) => (
          <ListGroup.Item action key={m.id} onClick={() => onSelect(m)}>
            {getMatchTitle(m)}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default ScheduledMatches;

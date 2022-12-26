import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const TeamsList = ({ teams, selectedTeam, onSelectTeam, shadow = false }) => (
  <ListGroup className={shadow ? "shadow-sm" : null}>
    {teams.map((team) => (
      <ListGroup.Item
        key={team.id}
        action
        active={team.id === selectedTeam?.id}
        onClick={() => onSelectTeam(team)}
      >
        {team.name}
      </ListGroup.Item>
    ))}
  </ListGroup>
);

export default TeamsList;

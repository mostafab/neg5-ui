import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const TeamsList = ({
  teams,
  selectedTeam = null,
  onSelectTeam = null,
  shadow = false,
}) => (
  <ListGroup className={shadow ? "shadow-sm" : null}>
    {teams.map((team) => (
      <ListGroup.Item
        key={team.id}
        action={onSelectTeam ? true : false}
        active={team.id === selectedTeam?.id}
        onClick={onSelectTeam ? () => onSelectTeam(team) : null}
      >
        {team.name}
      </ListGroup.Item>
    ))}
  </ListGroup>
);

export default TeamsList;

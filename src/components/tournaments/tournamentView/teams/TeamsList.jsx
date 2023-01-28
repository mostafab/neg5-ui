import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import groupBy from "lodash/groupBy";

const TeamsList = ({
  teams,
  selectedTeam = null,
  onSelectTeam = null,
  shadow = false,
  grouped = false,
  teamGroups = null,
  flush = false,
}) => {
  if (grouped && teamGroups?.length > 0) {
    const teamsByGroup = groupBy(teams, (t) => t.teamGroupId || null);
    return (
      <ListGroup className={shadow ? "shadow-sm" : null}>
        {teamGroups.map((tg) =>
          (teamsByGroup[tg.id] || []).length > 1 ? (
            <ListGroup.Item key={tg.id}>
              <h6>{tg.name}</h6>
              <TeamsList
                key={tg.id}
                teams={teamsByGroup[tg.id] || []}
                selectedTeam={selectedTeam}
                onSelectTeam={onSelectTeam}
                flush
              />
            </ListGroup.Item>
          ) : (
            <TeamsList
              key={tg.id}
              teams={teamsByGroup[tg.id] || []}
              selectedTeam={selectedTeam}
              onSelectTeam={onSelectTeam}
            />
          )
        )}
        <TeamsList
          teams={teamsByGroup["null"] || []}
          selectedTeam={selectedTeam}
          onSelectTeam={onSelectTeam}
        />
      </ListGroup>
    );
  }
  return (
    <ListGroup
      className={shadow ? "shadow-sm" : null}
      variant={flush ? "flush" : null}
    >
      {teams.map((team) => (
        <ListGroup.Item
          key={team.id}
          action={onSelectTeam ? true : false}
          active={team.id === selectedTeam?.id}
          onClick={onSelectTeam ? () => onSelectTeam(team) : null}
          className={flush ? "border-0" : ""}
        >
          {team.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TeamsList;

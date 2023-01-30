import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import groupBy from "lodash/groupBy";
import orderBy from "lodash/orderBy";

const TeamsList = ({
  teams,
  selectedTeam = null,
  onSelectTeam = null,
  shadow = false,
  grouped = false,
  teamGroups = null,
  rowClasses = "",
}) => {
  if (grouped && teamGroups?.length > 0) {
    const teamsByGroup = groupBy(teams, (t) => t.teamGroupId || null);
    return (
      <ListGroup className={shadow ? "shadow-sm" : null}>
        {orderBy(teamGroups, "name").map((tg) => (
          <div key={tg.id}>
            <div className="border-1 text-bg-light p-2 ps-3">
              <span>{tg.name}</span>
            </div>
            {teamsByGroup[tg.id]?.length > 0 ? (
              <TeamsList
                key={tg.id}
                teams={teamsByGroup[tg.id] || []}
                selectedTeam={selectedTeam}
                onSelectTeam={onSelectTeam}
                rowClasses="ps-4"
              />
            ) : (
              <div className="border-1 bg-white p-2 ps-4">
                <span>No teams added yet</span>
              </div>
            )}
          </div>
        ))}
        <TeamsList
          teams={teamsByGroup["null"] || []}
          selectedTeam={selectedTeam}
          onSelectTeam={onSelectTeam}
        />
      </ListGroup>
    );
  }
  return (
    <ListGroup className={shadow ? "shadow-sm" : null}>
      {orderBy(teams, "name").map((team) => (
        <ListGroup.Item
          key={team.id}
          action={onSelectTeam ? true : false}
          active={team.id === selectedTeam?.id}
          onClick={onSelectTeam ? () => onSelectTeam(team) : null}
          className={rowClasses}
        >
          {team.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TeamsList;

import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useDrop, useDrag } from "react-dnd";

import Card from "@components/common/cards";

import { DraggableType } from "./_dragUtils";

const DraggableTeamRow = ({ team, poolId }) => {
  const [, drag] = useDrag(() => ({
    type: DraggableType.TEAM_POOL_ASSIGNMENT,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: { team, sourcePoolId: poolId },
  }));
  return (
    <div ref={drag}>
      <ListGroup.Item action>{team.name}</ListGroup.Item>
    </div>
  );
};

const PoolCard = ({ pool, teams, onAssignTeam }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: DraggableType.TEAM_POOL_ASSIGNMENT,
    drop: (item) => onAssignTeam(item.team, item.sourcePoolId, pool.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  return (
    <div ref={drop}>
      <Card
        title={
          <h6>
            <b>
              {pool.name} ({teams.length})
            </b>
          </h6>
        }
        shadow={false}
        className="mt-4"
      >
        <hr />
        <ListGroup>
          {teams.map((t) => (
            <DraggableTeamRow team={t} key={t.id} poolId={pool.id || null} />
          ))}
        </ListGroup>
      </Card>
    </div>
  );
};

export default PoolCard;

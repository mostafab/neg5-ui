import React from "react";

import Card from "@components/common/cards";
import Pill from "@components/common/pill";

const TournamentCard = ({
  name,
  location,
  tournamentDate,
  questionSet,
  onClick,
  isCollaborator,
}) => (
  <Card className="mb-4" title={name} onClick={onClick}>
    <p>{location}</p>
    <p>{tournamentDate}</p>
    <p>{questionSet}</p>
    <Pill type={isCollaborator ? "secondary" : "primary"}>
      {isCollaborator ? "Collaborator" : "Owner"}
    </Pill>
  </Card>
);

export default TournamentCard;

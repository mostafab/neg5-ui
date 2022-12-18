import React from "react";

import Card from "components/common/cards";

const TournamentCard = ({
  name,
  location,
  tournamentDate,
  questionSet,
  onClick,
}) => (
  <Card className="mb-4" title={name} onClick={onClick}>
    <p>{location}</p>
    <p>{tournamentDate}</p>
    <p>{questionSet}</p>
  </Card>
);

export default TournamentCard;

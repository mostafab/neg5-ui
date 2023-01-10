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
  <Card
    className="mb-4"
    title={
      <h6>
        <a
          role="button"
          href=""
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          {name}
        </a>
      </h6>
    }
  >
    <p>{location}</p>
    <p>{tournamentDate}</p>
    <p>{questionSet}</p>
    <Pill type={isCollaborator ? "secondary" : "primary"}>
      {isCollaborator ? "Collaborator" : "Owner"}
    </Pill>
  </Card>
);

export default TournamentCard;

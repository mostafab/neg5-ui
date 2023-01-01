import React from "react";

const NoTeamsAdded = ({ onAddTeam }) => (
  <div className="p-2 d-flex justify-content-center">
    No teams have been added.
    <a
      className="ml-2"
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onAddTeam();
      }}
    >
      &nbsp;{"Add one!"}
    </a>
  </div>
);

export default NoTeamsAdded;

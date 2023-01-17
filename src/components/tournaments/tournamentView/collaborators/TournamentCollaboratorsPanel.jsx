import React, { useState } from "react";

import Card from "@components/common/cards";
import { Edit } from "@components/common/icon";
import CollaboratorsModal from "./CollaboratorsModal";

const TournamentCollaboratorsPanel = ({
  collaborators,
  currentUserId,
  directorId,
}) => {
  const [showModal, setShowModal] = useState(false);
  const renderCardBody = () => {
    return (
      <span>
        {`${collaborators.length} collaborator${
          collaborators.length === 1 ? " has" : "s have"
        } been added.`}
      </span>
    );
  };

  return (
    <>
      <Card
        title="Collaborators"
        actions={[
          {
            component: <Edit onClick={() => setShowModal(true)} />,
          },
        ]}
      >
        {renderCardBody()}
        {showModal && (
          <CollaboratorsModal
            collaborators={collaborators}
            onHide={() => setShowModal(false)}
            currentUserId={currentUserId}
            directorId={directorId}
          />
        )}
      </Card>
    </>
  );
};

export default TournamentCollaboratorsPanel;

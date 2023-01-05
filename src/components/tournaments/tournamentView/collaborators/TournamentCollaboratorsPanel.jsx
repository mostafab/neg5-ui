import React, { useState } from "react";

import Card from "@components/common/cards";
import { Edit } from "@components/common/icon";
import CollaboratorsModal from "./CollaboratorsModal";

const TournamentCollaboratorsPanel = ({ collaborators, currentUserId }) => {
  const [showModal, setShowModal] = useState(false);
  const renderCardBody = () => {
    return (
      <span>
        {collaborators.length === 0
          ? "No collaborators have been added yet."
          : `${collaborators.length} collaborators have been added.`}
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
          />
        )}
      </Card>
    </>
  );
};

export default TournamentCollaboratorsPanel;

import React, { useState } from "react";

import Card from "@components/common/cards";
import Icon from "@components/common/icon";
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
            component: (
              <Icon
                name="PersonAdd"
                className="float-end"
                onClick={() => setShowModal(true)}
              />
            ),
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

import React, { useState } from "react";

import Card from "@components/common/cards";
import { Expand } from "@components/common/icon";
import CollaboratorsModal from "./CollaboratorsModal";

const TournamentCollaboratorsPanel = ({ collaborators, currentUserId }) => {
  const [showModal, setShowModal] = useState(false);
  const renderTitle = () => (
    <span>
      Collaborators
      <Expand className="float-end" onClick={() => setShowModal(true)} />
    </span>
  );

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
      <Card title={renderTitle()}>
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

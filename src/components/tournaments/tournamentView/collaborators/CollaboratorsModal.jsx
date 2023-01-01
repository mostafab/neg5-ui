import React from "react";

import Modal from "@components/common/modal";
import { Info } from "@components/common/alerts";

import UserSearch from "./UserSearch";
import CollaboratorsList from "./CollaboratorsList";

/* eslint-disable react/no-unescaped-entities */
const CollaboratorsModal = ({ collaborators, onHide, currentUserId }) => (
  <Modal size="md" title="Update Collaborators" onHide={onHide}>
    <UserSearch
      placeholder="Add people"
      filterFunction={(c) =>
        c.id !== currentUserId &&
        !collaborators.find((collab) => collab.userId === c.id)
      }
    />
    <Info className="mt-3">
      All collaborators can add matches and players. Admin-level collaborators
      can edit and delete teams, players and matches they didn't create, as well
      as assign team pools.
    </Info>
    {collaborators.length > 0 && (
      <CollaboratorsList
        collaborators={collaborators}
        styles={{
          maxHeight: "30vh",
          overflow: "scroll",
        }}
      />
    )}
  </Modal>
);

export default CollaboratorsModal;

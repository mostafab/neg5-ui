import React, { useState, useContext } from "react";

import { useAppDispatch } from "@store";
import { collaboratorAddedOrUpdated } from "@features/tournamentView/tournamentCollaboratorsSlice";
import { addOrUpdateCollaborator } from "@api/collaborator";
import { doValidatedApiRequest } from "@api/common";

import CommonErrorBanner from "@components/common/errors/CommonErrorBanner";
import { TournamentIdContext } from "@components/tournaments/common/context";
import Modal from "@components/common/modal";
import { Info } from "@components/common/alerts";

import UserSearch from "./UserSearch";
import CollaboratorsList from "./CollaboratorsList";

/* eslint-disable react/no-unescaped-entities */
const CollaboratorsModal = ({ collaborators, onHide, currentUserId }) => {
  const [submitData, setSubmitData] = useState({
    error: null,
  });
  const tournamentId = useContext(TournamentIdContext);
  const dispatch = useAppDispatch();
  const addOrUpdateUser = async (userId, isAdmin) => {
    const payload = {
      userId,
      isAdmin,
      tournamentId,
    };
    setSubmitData({
      error: null,
    });
    const response = await doValidatedApiRequest(() =>
      addOrUpdateCollaborator(payload)
    );
    setSubmitData({
      error: response.errors || null,
    });
    if (!response.errors) {
      dispatch(collaboratorAddedOrUpdated(response));
    }
  };
  return (
    <Modal size="md" title="Update Collaborators" onHide={onHide}>
      {submitData.error && <CommonErrorBanner errors={submitData.error} />}
      <UserSearch
        placeholder="Add people"
        onSelect={(user) => addOrUpdateUser(user.id, false)}
        filterFunction={(c) =>
          c.id !== currentUserId &&
          !collaborators.find((collab) => collab.userId === c.id)
        }
      />
      <Info className="mt-3">
        All collaborators can add matches and players. Admin-level collaborators
        can edit and delete teams, players and matches they didn't create, as
        well as assign team pools.
      </Info>
      {collaborators.length > 0 && (
        <CollaboratorsList
          collaborators={collaborators}
          styles={{
            maxHeight: "30vh",
            minHeight: "20vh",
            overflow: "scroll",
          }}
        />
      )}
    </Modal>
  );
};

export default CollaboratorsModal;

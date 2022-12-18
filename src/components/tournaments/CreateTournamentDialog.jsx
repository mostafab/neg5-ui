import React from "react";

import { useAppDispatch } from "store";
import { closeAddTournament } from "features/myTournaments/myTournamentsSlice";
import Modal from "components/common/modal";

import CreateTournamentForm from "./CreateTournamentForm";

const CreateTournamentDialog = () => {
  const dispatch = useAppDispatch();
  return (
    <Modal
      title="Add a Tournament"
      onHide={() => dispatch(closeAddTournament())}
    >
      <CreateTournamentForm />
    </Modal>
  );
};

export default CreateTournamentDialog;

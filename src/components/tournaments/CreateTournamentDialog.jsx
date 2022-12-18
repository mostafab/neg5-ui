import React from "react";

import { useAppDispatch } from "store";
import { closeAddTournament } from "features/myTournaments/myTournamentsSlice";
import Modal from "components/common/modal";

const CreateTournamentDialog = () => {
  const dispatch = useAppDispatch();
  return (
    <Modal
      title="Add a Tournament"
      onHide={() => dispatch(closeAddTournament())}
    >
      sdada
    </Modal>
  );
};

export default CreateTournamentDialog;

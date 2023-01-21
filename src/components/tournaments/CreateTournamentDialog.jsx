import React, { useState } from "react";
import { useRouter } from "next/router";

import Modal from "@components/common/modal";
import CreateTournamentForm from "./CreateTournamentForm";

const CreateTournamentDialog = ({ onClose, submitting, error }) => {
  const router = useRouter();
  const [navigating, setNavigating] = useState(false);
  const onSuccess = (tournament) => {
    setNavigating(true);
    router.push(`/tournaments/${tournament.id}`);
  };
  return (
    <Modal title="Add a Tournament" onHide={onClose}>
      {
        <CreateTournamentForm
          submitting={submitting || navigating}
          error={error}
          onSuccess={onSuccess}
        />
      }
    </Modal>
  );
};

export default CreateTournamentDialog;

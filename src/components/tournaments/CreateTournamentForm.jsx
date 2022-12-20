import React, { useState } from "react";
import * as Yup from "yup";

import { useAppDispatch } from "@store";
import { Form } from "@components/common/forms";
import Button from "@components/common/button";
import { Error } from "@components/common/alerts";
import { createTournamentAsync } from "@features/myTournaments/myTournamentsSlice";

import TournamentInfoFields, {
  validation as infoValidation,
} from "@components/tournaments/common/TournamentInfoFields";
import ScoringRulesFields, {
  validation as rulesValidation,
} from "@components/tournaments/common/ScoringRulesFields";

const initialValues = () => ({
  name: "",
  tournamentDate: "",
  location: "",
  questionSet: "",
  bonusPointValue: 10,
  partsPerBonus: 3,
  maxActivePlayersPerTeam: 4,
  usesBouncebacks: false,
  allowTies: false,
  tossupValues: [
    {
      value: 15,
      answerType: "Power",
    },
    {
      value: 10,
      answerType: "Base",
    },
    {
      value: -5,
      answerType: "Neg",
    },
  ],
});

const validation = Yup.object({
  ...infoValidation(),
  ...rulesValidation(),
});

const CreateTournamentForm = ({ submitting, error = null }) => {
  const dispatch = useAppDispatch();
  const [showRules, setShowRules] = useState(false);

  const renderError = () => {
    if (!error) {
      return null;
    }
    const message = Array.isArray(error) ? (
      <>
        There was an issue submitting your request.
        <ul>
          {error.map((err, idx) => (
            <li key={idx}>{err.message}</li>
          ))}
        </ul>
      </>
    ) : (
      error
    );
    return <Error>{message}</Error>;
  };

  const renderFields = () => {
    return (
      <>
        <TournamentInfoFields />
        {!showRules && (
          <div className="d-flex justify-content-center">
            <Button onClick={() => setShowRules(true)} type="link">
              Set Custom Scoring Rules
            </Button>
          </div>
        )}
        {showRules && <ScoringRulesFields className="mb-3" />}
        {renderError()}
      </>
    );
  };
  return (
    <Form
      name="CreateTournamentForm"
      initialValues={initialValues()}
      validation={validation}
      submitButtonText="Create Tournament"
      onSubmit={(values) => {
        dispatch(createTournamentAsync({ values }));
      }}
      submitting={submitting}
    >
      {renderFields()}
    </Form>
  );
};

export default CreateTournamentForm;

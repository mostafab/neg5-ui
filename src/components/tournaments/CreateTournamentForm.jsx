import React, { useState } from "react";
import * as Yup from "yup";

import { useAppDispatch } from "store";
import { Form } from "@components/common/forms";
import Button from "@components/common/button";
import { createTournamentAsync } from "@features/myTournaments/myTournamentsSlice";

import TournamentInfoFields, {
  validation as infoValidation,
} from "@components/tournaments/common/TournamentInfoFields";
import ScoringRulesFields, {
  validation as rulesValidation,
} from "@components/tournaments/common/ScoringRulesFields";

const initialValues = {
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
};

const validation = Yup.object({
  ...infoValidation(),
  ...rulesValidation(),
});

const CreateTournamentForm = ({ submitting }) => {
  const dispatch = useAppDispatch();
  const [stage, setStage] = useState("required");

  const renderCurrentStage = () => {
    switch (stage) {
      case "required":
        return (
          <>
            <TournamentInfoFields />
            <div className="d-flex justify-content-center mb-3">
              <Button onClick={() => setStage("rules")} type="link">
                Set Custom Scoring Rules
              </Button>
            </div>
          </>
        );
      case "rules":
        return (
          <>
            <ScoringRulesFields />
            <div className="d-flex justify-content-center mb-3">
              <Button onClick={() => setStage("required")} type="link">
                Back
              </Button>
            </div>
          </>
        );
      default:
        break;
    }
  };
  return (
    <Form
      name="CreateTournamentForm"
      initialValues={initialValues}
      validation={validation}
      submitButtonText="Create"
      onSubmit={(values) => {
        console.log(values);
        dispatch(createTournamentAsync({ values }));
      }}
      submitting={submitting}
    >
      {renderCurrentStage()}
    </Form>
  );
};

export default CreateTournamentForm;

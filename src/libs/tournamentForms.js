import orderBy from "lodash/orderBy";

export const getTeamOptions = (teams) =>
  orderBy(
    teams.map((t) => ({
      value: t.id,
      label: t.name,
    })),
    "label"
  );

export const getPhaseOptions = (phases) =>
  orderBy(
    phases.map((p) => ({
      value: p.id,
      label: p.name,
    })),
    "label"
  );

export const answerTypeToPillType = {
  Power: "success",
  Base: "info",
  Neg: "danger",
};

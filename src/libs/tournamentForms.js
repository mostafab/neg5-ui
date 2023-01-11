import orderBy from "lodash/orderBy";
import mapValues from "lodash/mapValues";
import groupBy from "lodash/groupBy";

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

export const getTeamOptionsWithPools = (teams, pools, phaseId) => {
  const teamOptionsByPool = mapValues(
    groupBy(
      teams,
      (team) => team.divisions.find((d) => d.phaseId === phaseId)?.id || null
    ),
    (poolTeams) => getTeamOptions(poolTeams)
  );
  const optionGroups = Object.entries(teamOptionsByPool).map(
    ([poolId, teamOptions]) => {
      return {
        label:
          poolId !== "null"
            ? pools.find((p) => p.id === poolId).name
            : "Unassigned",
        options: teamOptions,
      };
    }
  );
  return optionGroups;
};

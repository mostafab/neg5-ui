export const Events = {
  scoresheet: {
    createdOrUpdated: "client-scoresheet/scoresheetCreatedOrUpdated",
    deleted: "client-scoresheet/deleted",
  },
  match: {
    createdOrUpdated: "client-match/matchCreatedOrUpdated",
    deleted: "client-match/deleted",
  },
  rules: {
    updated: "client-rules/updated",
  },
  tournamentInfo: {
    updated: "client-tournament/infoUpdated",
  },
  teams: {
    createdOrUpdated: "client-team/createdOrUpdated",
    deleted: "client-team/deleted",
    poolsUpdated: "client-team/pools-updated",
    teamGroupAddedOrUpdated: "client-team/groupAddedOrCreated",
  },
  pools: {
    deleted: "client-pools/deleted",
    added: "client-pools/added",
  },
  phases: {
    added: "client-phases/added",
  },
  schedule: {
    createdOrUpdated: "client-schedule/createdOrUpdated",
  },
};

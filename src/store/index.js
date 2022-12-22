import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { combineReducers } from "redux";
import { createLogger } from "redux-logger";

import config from "config";

import { loginReducer } from "@features/login/loginSlice";
import { myTournamentsReducer } from "@features/myTournaments/myTournamentsSlice";
import { tournamentPermissionsReducer } from "@features/tournamentPermissions/tournamentPermissionsSlice";
import { tournamentInfoReducer } from "@features/tournamentView/tournamentInfoSlice";
import { tournamentMatchesReducer } from "@features/tournamentView/matchesSlice";
import { tournamentRulesReducer } from "@features/tournamentView/rulesSlice";
import { tournamentPhasesReducer } from "@features/tournamentView/phasesSlice";
import { tournamentTeamsReducer } from "@features/tournamentView/teamsSlice";

const combinedReducer = combineReducers({
  loginReducer,
  myTournamentsReducer,
  tournamentPermissionsReducer,
  tournamentInfoReducer,
  tournamentMatchesReducer,
  tournamentRulesReducer,
  tournamentPhasesReducer,
  tournamentTeamsReducer,
});

const reducer = (state, action) => {
  return combinedReducer(state, action);
};

export const createStore = (preloadedState) => {
  const middlewares = [];

  if (config.env === "development" && typeof window !== "undefined") {
    const logger = createLogger({
      level: "info",
      collapsed: true,
    });

    middlewares.push(logger);
  }

  return configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(...middlewares),
    devTools: config.env === "development",
  });
};

export const useAppDispatch = () => useDispatch();

export const useAppSelector = useSelector;

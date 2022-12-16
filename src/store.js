import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { combineReducers } from "redux";
import { createLogger } from "redux-logger";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

import config from "config";
import { loginReducer } from "features/login/loginSlice";

const rootReducer = combineReducers({
  loginReducer,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return rootReducer(state, action);
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

export const wrapper = createWrapper(createStore, {
  debug: process.env.NODE_ENV !== "production",
});

export const useAppDispatch = () => useDispatch();

export const useAppSelector = useSelector;

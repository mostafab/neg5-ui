import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { loadCollaborators } from "@api/tournaments";

const initialState = {
  collaborators: [],
};

const slice = createSlice({
  name: "tournamentCollaborators",
  initialState,
  reducers: {
    collaboratorAddedOrUpdated(state, action) {
      state.collaborators.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCollaboratorsDataAsync.fulfilled, (state, action) => {
      state.collaborators = action.payload;
    });
  },
});

export const loadCollaboratorsDataAsync = createAsyncThunk(
  "tournamentCollaboratorsSlice/loadCollaborators",
  async (tournamentId) => {
    return await loadCollaborators(tournamentId);
  }
);

export const tournamentCollaboratorsReducer = slice.reducer;

export const { collaboratorAddedOrUpdated } = slice.actions;

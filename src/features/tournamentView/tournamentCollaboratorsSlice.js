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
      const index = state.collaborators.findIndex(
        (c) => c.userId === action.payload.userId
      );
      if (index >= 0) {
        state.collaborators[index] = action.payload;
      } else {
        state.collaborators.push(action.payload);
      }
    },
    collaboratorDeleted(state, action) {
      const userId = action.payload.userId;
      state.collaborators = state.collaborators.filter(
        (c) => c.userId !== userId
      );
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

export const { collaboratorAddedOrUpdated, collaboratorDeleted } =
  slice.actions;

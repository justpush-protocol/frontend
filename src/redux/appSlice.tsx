import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
  dark: boolean;
}

const initialState: AppState = {
  dark: false,
};

export const appSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.dark = !state.dark;
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //     state.value += action.payload
    //   },
  },
});

// Action creators are generated for each case reducer function
export const { changeTheme } = appSlice.actions;

export default appSlice.reducer;

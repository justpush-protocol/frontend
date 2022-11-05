import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
  dark: boolean;
  sidebarOpen: boolean;
}

const initialState: AppState = {
  dark: false,
  sidebarOpen: false,
};

export const appSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.dark = !state.dark;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //     state.value += action.payload
    //   },
  },
});

// Action creators are generated for each case reducer function
export const { changeTheme, toggleSidebar } = appSlice.actions;

export default appSlice.reducer;

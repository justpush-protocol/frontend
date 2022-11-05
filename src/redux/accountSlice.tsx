import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AccountState {
  connected: number;
  currentAddress: string | null;
}

const initialState: AccountState = {
  connected: 0, // -1 wallet locked, 200 success,  4000 pending, 4001 rejected
  currentAddress: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentAddress: (state, action: PayloadAction<string | null>) => {
      state.currentAddress = action.payload;
    },
    setConnected: (state, action: PayloadAction<number>) => {
      state.connected = action.payload;
    }
  },
});

export const { setCurrentAddress, setConnected } = accountSlice.actions;
export default accountSlice.reducer;

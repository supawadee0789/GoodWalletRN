import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  total: 0,
  user: '',
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    getTotal: (state = initialState, action) => {
      state.total = action.payload;
    },
    saveUser: (state = initialState, action) => {
      state.user = action.payload;
    },
  },
});

export const getTotalValue = (state: initialState) => state.wallet.total;
export const getUser = (state: initialState) => state.wallet.user;

export const {getTotal, saveUser} = walletSlice.actions;

export default walletSlice.reducer;

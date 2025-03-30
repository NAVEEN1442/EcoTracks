import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
  },
  reducers: {
    addData: (state, action) => {
      state.items.push(action.payload);
      console.log("added item in add data",action.payload)
    },
  },
});

export const { addData } = dataSlice.actions;
export default dataSlice.reducer;

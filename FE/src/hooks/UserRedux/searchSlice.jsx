import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    setSearchField: (state, action) => action.payload,
  },
});

export const { setSearchField } = searchSlice.actions;

export default searchSlice.reducer;
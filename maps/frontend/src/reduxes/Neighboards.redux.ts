import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { theJsonShchunot } from '../typesschema/neighboard.type'; 

type  insideSlice =  {
  neighboards: theJsonShchunot | null;
}

const initialState: insideSlice = {
  neighboards: null
};

export const counterSlice = createSlice({
  name: 'neigboards',
  initialState,
  reducers: {
    replace: (state, action: PayloadAction<theJsonShchunot>) => {
      state.neighboards = action.payload;
    }
  }
});

export const { replace } = counterSlice.actions;
export default counterSlice.reducer;
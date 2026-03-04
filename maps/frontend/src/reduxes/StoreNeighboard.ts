import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./Neighboards.redux";

   export const store = configureStore({
    reducer: {
      neighboards: counterSlice.reducer,
    },
  });


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/*const getAllNeigboards =  getAllNeigboards() {
  const neighboards = useSelector(
    (state: RootState) => state.neighboards.neighboards,
  );

  return neighboards
}*/

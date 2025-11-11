import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./../component/slice";

const Store = configureStore({
  reducer: {
    student: studentReducer,
  },
});
export default Store;

import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
  },
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
  },
});

export const { addStudent } = studentSlice.actions;
export default studentSlice.reducer;

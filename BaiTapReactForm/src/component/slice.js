import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "studentRegister",
  initialState: {
    students: [],
  },
  reducers: {
    addStudentRegister: (state, action) => {
      state.students.push(action.payload);
    },

    updateStudentRegister: (state, action) => {
      const index = state.students.findIndex((student) => {
        return student.studentId === action.payload.studentId;
      });
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
  },
});

export const { addStudentRegister, updateStudentRegister } =
  studentSlice.actions;

export default studentSlice.reducer;

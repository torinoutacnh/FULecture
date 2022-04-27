import { createSlice } from '@reduxjs/toolkit';
import { store } from 'redux/store';
import { SemesterState, TSemester } from '../../types/semester';
import { getSemesters } from '../../pages/Topics/components/SelectedListApi';

const initialState: SemesterState = {
  isLoading: false,
  error: false,
  semester: null
};

const slice = createSlice({
  name: 'semester',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getSemester(state, action) {
      state.isLoading = false;
      state.semester = action.payload;
    }
  }
});

export default slice.reducer;

export function getSemesterState(semester: TSemester) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.getSemester(semester));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}

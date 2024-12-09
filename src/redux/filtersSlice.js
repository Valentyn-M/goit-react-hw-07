import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	value: ""
}

const slice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		changeFilter: (state, action) => {
			state.value = action.payload;
		}
	}
});

export const { changeFilter } = slice.actions;

export const filtersReducer = slice.reducer;
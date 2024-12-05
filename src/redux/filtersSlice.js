import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	name: ""
}

const slice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		changeFilter: (state, action) => {
			state.name = action.payload;
		}
	}
});

// Функція-селектор, що повертає значення фільтра з властивості name
export const selectNameFilter = (state) => state.filters.name;

export const { changeFilter } = slice.actions;

export const filtersReducer = slice.reducer;
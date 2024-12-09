import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	isActiveModalName: false,
	isActiveModalNumber: false,
	activeContactId: null, // ID контакту, для якого відкрито модальне вікно
	isActiveModalDelete: false,
}

const slice = createSlice({
	name: "modals",
	initialState,
	reducers: {
		toggleModalName: (state, action) => {
			state.isActiveModalName = action.payload.isActive;
			state.activeContactId = action.payload.contactId || null; // Зберігаємо ID контакту
		},
		toggleModalNumber: (state, action) => {
			state.isActiveModalNumber = action.payload.isActive;
			state.activeContactId = action.payload.contactId || null; // Зберігаємо ID контакту
		},
		toggleModalDelete: (state, action) => {
			state.isActiveModalDelete = action.payload.isActive;
			state.activeContactId = action.payload.contactId || null;
		},
	}
});

export const { toggleModalName, toggleModalNumber, closeModalNumber, toggleModalDelete } = slice.actions;

export const modalsReducer = slice.reducer;
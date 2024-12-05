import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	name: false,// Вказує, чи відчинено модальне вікно
	number: false, // Вказує, чи відчинено модальне вікно
	activeContactId: null, // ID контакту, для якого відкрито модальне вікно
}

const slice = createSlice({
	name: "modals",
	initialState,
	reducers: {
		toggleModalName: (state, action) => {
			state.name = action.payload.isActive;
			state.activeContactId = action.payload.contactId || null; // Зберігаємо ID контакту
		},
		toggleModalNumber: (state, action) => {
			state.number = action.payload.isActive;
			state.activeContactId = action.payload.contactId || null; // Зберігаємо ID контакту
		},
	}
});

export const selectModalName = (state) => state.modals.name;
export const selectModalNumber = (state) => state.modals.number;
export const selectActiveContactId = (state) => state.modals.activeContactId;

export const { toggleModalName, toggleModalNumber } = slice.actions;

export const modalsReducer = slice.reducer;
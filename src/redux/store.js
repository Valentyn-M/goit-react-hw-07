import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contactsSlice";
import { filtersReducer } from "./filtersSlice";
import { modalsReducer } from "./modalsSlice";

// Код оголошення редюсерів слайсів
export const store = configureStore({
	reducer: {
		contacts: contactsReducer,
		filters: filtersReducer,
		modals: modalsReducer,
	}
});
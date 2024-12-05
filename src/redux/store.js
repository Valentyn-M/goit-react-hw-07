import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contactsSlice";
import { filtersReducer } from "./filtersSlice";

// Бібліотека Redux Persist для збереження масиву контактів у локальному сховищі.
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { modalsReducer } from "./modalsSlice";

const persistConfig = {
	key: 'saved-contacts',
	version: 1,
	storage,
};

// Використовуємо persistReducer, щоб застосувати конфігурацію до редюсера слайса контактів
const persistedReducer = persistReducer(persistConfig, contactsReducer);

// Код оголошення редюсерів слайсів
export const store = configureStore({
	reducer: {
		contacts: persistedReducer,
		filters: filtersReducer,
		modals: modalsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

// Використовуємо persistStore для створення persistor для PersistGate
export const persistor = persistStore(store);
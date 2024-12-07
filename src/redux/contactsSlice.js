import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { addContact, fetchContacts, deleteContact, editContactName, editContactNumber } from "./contactsOps";

// Початковий стан редюсера слайсу
const initialState = {
	items: [],
	loading: false,
	error: null,
	successAdd: false,
	successDelete: false,
}

const slice = createSlice({
	// Ім'я слайсу (Властивість name визначає ім'я слайсу, яке додаватиметься як приставка під час створення екшенів, оголошених у властивості reducers.)
	name: "contacts",
	// Початковий стан редюсера слайсу
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null; // Скидаємо помилку
		},
		clearSuccess: (state, action) => {
			state[action.payload] = false;	// Скидаємо інфу про успішність операції
		},
	},
	// Додаємо обробку зовнішніх екшенів
	// Властивість extraReducers використовується для оголошення редюсерів, які обробляють «зовнішні» екшени, тобто ті, що НЕ створені через reducers
	// Це корисно для обробки екшенів із життєвим циклом запиту (pending, fulfilled, rejected), які автоматично створює createAsyncThunk.
	extraReducers: (builder) => {
		builder
			.addCase(fetchContacts.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.items = action.payload;
			})
			.addCase(addContact.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.successAdd = true;
				state.items.push(action.payload);
			})
			.addCase(deleteContact.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.successDelete = true;
				// Повертаємо новий масив відфільтрованих об'єктів, які задовольняють умові (item.id !== action.payload.id)
				state.items = state.items.filter(item => item.id !== action.payload.id);
			})
			.addCase(editContactName.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				const contact = state.items.find(item => item.id === action.payload.id);
				contact.name = action.payload.name;
			})
			.addCase(editContactNumber.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				const contact = state.items.find(item => item.id === action.payload.id);
				contact.number = action.payload.number;
			})
			// builder.addMatcher(predicate, reducer)
			// Метод addMatcher дозволяє обробляти дії, що відповідають певній умові (predicate). Це корисно, якщо потрібно групувати обробку кількох дій.
			.addMatcher(
				// isAnyOf - допоміжна функція, яка спрощує створення предикатів для addMatcher. Вона повертає true, якщо дія відповідає будь-якій з переданих дій.
				isAnyOf(
					fetchContacts.pending,
					addContact.pending,
					deleteContact.pending,
					editContactName.pending,
					editContactNumber.pending
				),
				(state) => {
					state.loading = true;
				}
			)
			.addMatcher(
				isAnyOf(
					fetchContacts.rejected,
					addContact.rejected,
					deleteContact.rejected,
					editContactName.rejected,
					editContactNumber.rejected
				),
				(state, action) => {
					state.error = action.payload;
					state.loading = false;
				}
			)
	}
});

export const { clearError, clearSuccess } = slice.actions;

// Експортуємо редюсер слайсу
// У властивість reducer зберігається редюсер слайсу який експортуємо із файла і передаємо при створенні стора.
export const contactsReducer = slice.reducer;


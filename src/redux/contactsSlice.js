import { createSlice } from "@reduxjs/toolkit"

// Початковий стан редюсера слайсу
const initialState = {
	items: []
}

const slice = createSlice({
	// Ім'я слайсу (Властивість name визначає ім'я слайсу, яке додаватиметься як приставка під час створення екшенів, оголошених у властивості reducers.)
	name: "contacts",
	// Початковий стан редюсера слайсу
	initialState,
	// Об'єкт case-редюсерів (Кожен case-редюсер відповідає за один конкретний екшен і змінює стан)
	// У властивості reducers оголошуються case-редюсери - функції, які визначають, як змінювати стан слайсу у відповідь на певний екшен (action). 
	reducers: {
		addContact: (state, action) => {
			state.items.push(action.payload);
		},
		deleteContact: (state, action) => {
			// Повертаємо новий масив відфільтрованих об'єктів, які задовольняють умові (item.id !== action.payload)
			state.items = state.items.filter(item => item.id !== action.payload);
		},
		editContactName: (state, action) => {
			const contact = state.items.find(item => item.id === action.payload.id);
			contact.name = action.payload.newName;
		},
		editContactNumber: (state, action) => {
			const contact = state.items.find(item => item.id === action.payload.id);
			contact.number = action.payload.newNumber;
		}
	}
});

// Функції-селектори для використання в useSelector
export const selectContacts = (state) => state.contacts.items; // Повертає список контактів з властивості items
// 1. state - загальний стан нашого додатка
// 2. contacts - ім'я слайсу
// 3. items - значення властивості items з initialState цього слайсу


// Експортуємо екшени
export const { addContact, deleteContact, editContactName, editContactNumber } = slice.actions;

// Експортуємо редюсер слайсу
// У властивість reducer зберігається редюсер слайсу який експортуємо із файла і передаємо при створенні стора.
export const contactsReducer = slice.reducer;


// Функції-селектори для використання в useSelector

import { createSelector } from "@reduxjs/toolkit";

// Селекти з contactsSlice.
export const selectContacts = (state) => state.contacts.items;
// 1. state - загальний стан нашого додатка
// 2. contacts - ім'я слайсу
// 3. items - значення властивості items з initialState цього слайсу
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

// Селекти з modalsSlice
export const selectModalName = (state) => state.modals.isActiveModalName;
export const selectModalNumber = (state) => state.modals.isActiveModalNumber;
export const selectActiveContactId = (state) => state.modals.activeContactId;

// Селект з filtersSlice
export const selectNameFilter = (state) => state.filters.name;

// Фільтруємо контакти та отримуємо новий масив відфільтрованих контактів (ContactList)
export const selectFilteredContacts = createSelector(
	[selectContacts, selectNameFilter],
	(contacts, filterValue) => {
		return contacts.filter(contact => contact.name.toLowerCase().includes(filterValue.toLocaleLowerCase()));
	}
);

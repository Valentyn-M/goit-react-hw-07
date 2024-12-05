// Для того щоб в компоненті отримати дані зі стору, у бібліотеці React Redux є хук useSelector(selector)
import { useSelector } from "react-redux";
import Contact from "../Contact/Contact"
import s from "./ContactList.module.css"
import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";

const ContactList = () => {

	// Отримуємо масив contacts із стану Redux (Хук useSelector приймає state и повертає state.contacts.items)
	const contacts = useSelector(selectContacts);

	// Отримуємо значення фільтра із стану Redux
	const filterValue = useSelector(selectNameFilter);

	// Фільтруємо контакти в змiнну, отримуємо новий масив відфільтрованих контактів
	const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filterValue.toLocaleLowerCase()));

	return (
		<ul className={s.list}>
			{filteredContacts.map((contact) => (
				<li className={s.item} key={contact.id}>
					<Contact contact={contact} />
				</li>
			))}
		</ul>
	)
}

export default ContactList

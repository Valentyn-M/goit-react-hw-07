// Для того щоб в компоненті отримати дані зі стору, у бібліотеці React Redux є хук useSelector(selector)
import { useSelector } from "react-redux";
import Contact from "../Contact/Contact"
import s from "./ContactList.module.css"

import { selectFilteredContacts } from "../../redux/selectors";

const ContactList = () => {

	// Отримуємо значення Складового селектору - Відфільтровані контакти
	const filteredContacts = useSelector(selectFilteredContacts)

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

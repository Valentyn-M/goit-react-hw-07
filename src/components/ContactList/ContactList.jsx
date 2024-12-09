// Для того щоб в компоненті отримати дані зі стору, у бібліотеці React Redux є хук useSelector(selector)
import { useDispatch, useSelector } from "react-redux";
import Contact from "../Contact/Contact"
import s from "./ContactList.module.css"

import { selectFilteredContacts, selectSuccessAdd, selectSuccessDelete } from "../../redux/selectors";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { clearSuccess } from "../../redux/contactsSlice";

const ContactList = () => {

	// Отримуємо значення Складового селектору - Відфільтровані контакти
	const filteredContacts = useSelector(selectFilteredContacts);

	const isSuccessAdd = useSelector(selectSuccessAdd);
	const isSuccessDelete = useSelector(selectSuccessDelete);
	const dispatch = useDispatch();
	useEffect(() => {
		if (isSuccessAdd) {
			toast.success('Contact successfully created');
			dispatch(clearSuccess('successAdd'));
		};
		if (isSuccessDelete) {
			toast.success('Contact successfully deleted');
			dispatch(clearSuccess('successDelete'));
		}
	}, [isSuccessAdd, isSuccessDelete, dispatch]);

	return (
		<>
			<ul className={s.list}>
				{filteredContacts.map((contact) => (
					<li className={s.item} key={contact.id}>
						<Contact contact={contact} />
					</li>
				))}
			</ul>
			<Toaster
				position="top-center"
				reverseOrder={false}
				toastOptions={{
					success: {
						duration: 2500,
						style: {
							background: '#E2E5E9',
						},
					}
				}}
			/>
		</>
	)
}

export default ContactList

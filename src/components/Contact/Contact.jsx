// Для того щоб сповістити Redux про те, що в інтерфейсі відбулася якась подія, необхідно відправити екшен.
// Для цього у бібліотеці React Redux є хук useDispatch(), який повертає посилання на функцію надсилання екшенів dispatch
import { useDispatch, useSelector } from "react-redux";
// Імпортуємо екшен
import { deleteContact } from "../../redux/contactsSlice";
import s from "./Contact.module.css"
import { FaUserLarge, FaPhone } from "react-icons/fa6";
import { MdOutlineEdit, MdOutlinePersonRemove } from "react-icons/md";
import { selectActiveContactId, selectModalName, selectModalNumber, toggleModalName, toggleModalNumber } from "../../redux/modalsSlice";
import ModalName from "../ModalName/ModalName";
import ModalNumber from "../ModalNumber/ModalNumber";

const Contact = ({ contact }) => {

	const { id, name, number } = contact;

	// Отримуємо посилання на функцію відправки екшенів
	const dispatch = useDispatch();

	const isModalNameActive = useSelector(selectModalName);
	const isModalNumberActive = useSelector(selectModalNumber);
	const activeContactId = useSelector(selectActiveContactId);

	const handleOpenModalName = () => {
		dispatch(toggleModalName({ isActive: true, contactId: id })); // Встановлюємо стан для поточного контакту
	};
	const handleOpenModalNumber = () => {
		dispatch(toggleModalNumber({ isActive: true, contactId: id })); // Встановлюємо стан для поточного контакту
	};

	return (
		<div className={s.contact}>
			<ul className={s.list}>
				<li className={s.field}>
					<div className={s.fieldItem}><FaUserLarge className={s.icon} /><span className={s.fieldValue}>{name}</span></div>
					<button className={s.fieldBtn} onClick={handleOpenModalName}><MdOutlineEdit /><span>Edit</span></button>
				</li>
				<li className={s.field}>
					<div className={s.fieldItem}><FaPhone className={s.icon} /><span className={s.fieldValue}>{number}</span></div>
					<button className={s.fieldBtn} onClick={handleOpenModalNumber}><MdOutlineEdit /><span>Edit</span></button>
				</li>
			</ul>
			{/* При клику передаємо колбек-функцію, в якій ми викликаємо екшен та передаємо дані для payload (removeContact(id) і відправляємо екшен за допомогою dispatch) */}
			<button className={s.deleteBtn} onClick={() => { dispatch(deleteContact(id)) }}>
				<MdOutlinePersonRemove className={s.deleteBtnIcon} /><span>Delete contact</span>
			</button>

			{/* Умовний рендеринг модального вікна для конкретного контакту */}
			{isModalNameActive && activeContactId === id && <ModalName contact={contact} />}
			{isModalNumberActive && activeContactId === id && <ModalNumber contact={contact} />}
		</div>
	)
}

export default Contact

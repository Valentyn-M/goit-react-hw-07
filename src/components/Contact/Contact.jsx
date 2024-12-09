// Для того щоб сповістити Redux про те, що в інтерфейсі відбулася якась подія, необхідно відправити екшен.
// Для цього у бібліотеці React Redux є хук useDispatch(), який повертає посилання на функцію надсилання екшенів dispatch
import { useDispatch, useSelector } from "react-redux";
import s from "./Contact.module.css"
import { MdOutlinePersonOutline, MdOutlinePersonRemove, MdOutlinePhone } from "react-icons/md";
import { toggleModalDelete, toggleModalName, toggleModalNumber } from "../../redux/modalsSlice";
import ModalName from "../ModalName/ModalName";
import ModalNumber from "../ModalNumber/ModalNumber";
import { selectActiveContactId, selectModalDelete, selectModalName, selectModalNumber } from "../../redux/selectors";
import { TbEdit } from "react-icons/tb";
import ModalDelete from "../ModalDelete/ModalDelete";

const Contact = ({ contact }) => {

	const { id, name, number } = contact;

	// Отримуємо посилання на функцію відправки екшенів
	const dispatch = useDispatch();

	const isModalNameActive = useSelector(selectModalName);
	const isModalNumberActive = useSelector(selectModalNumber);
	const activeContactId = useSelector(selectActiveContactId);
	const isModalDeleterActive = useSelector(selectModalDelete);

	const handleOpenModalName = () => {
		dispatch(toggleModalName({ isActive: true, contactId: id })); // Встановлюємо стан для поточного контакту
	};
	const handleOpenModalNumber = () => {
		dispatch(toggleModalNumber({ isActive: true, contactId: id })); // Встановлюємо стан для поточного контакту
	};
	const handleOpenModalDelete = () => {
		dispatch(toggleModalDelete({ isActive: true, contactId: id }));
	};

	return (
		<div className={s.contact}>
			<ul className={s.list}>
				<li className={s.field}>
					<div className={s.fieldItem}><MdOutlinePersonOutline className={s.icon} /><span className={s.fieldValue}>{name}</span></div>
					<button className={s.fieldBtn} onClick={handleOpenModalName}><TbEdit /></button>
				</li>
				<li className={s.field}>
					<div className={s.fieldItem}><MdOutlinePhone className={s.icon} /><span className={s.fieldValue}>{number}</span></div>
					<button className={s.fieldBtn} onClick={handleOpenModalNumber}><TbEdit /></button>
				</li>
			</ul>
			{/* При клику передаємо колбек-функцію, в якій ми викликаємо екшен та передаємо дані для payload (deleteContacts(id) і відправляємо екшен за допомогою dispatch) */}
			<button className={s.deleteBtn} onClick={handleOpenModalDelete}>
				<MdOutlinePersonRemove className={s.deleteBtnIcon} /><span>Delete contact</span>
			</button>

			{/* Умовний рендеринг модального вікна для конкретного контакту */}
			{isModalNameActive && activeContactId === id && <ModalName contact={contact} />}
			{isModalNumberActive && activeContactId === id && <ModalNumber contact={contact} />}
			{isModalDeleterActive && activeContactId === id && <ModalDelete contact={contact} />}
		</div>
	)
}

export default Contact

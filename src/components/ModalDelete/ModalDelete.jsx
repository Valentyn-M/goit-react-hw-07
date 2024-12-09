import Modal from 'react-modal';
import s from './ModalDelete.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalDelete } from '../../redux/selectors';
import { useEffect } from 'react';
import { toggleModalDelete } from '../../redux/modalsSlice';
import { MdOutlineDelete } from 'react-icons/md';
import { IoCloseOutline } from 'react-icons/io5';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { deleteContact } from '../../redux/contactsOps';

const customStyles = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.65)',
		backdropFilter: 'blur(5px)',
		WebkitBackdropFilter: 'blur(10px)',
	},
	content: {
		padding: "0",
		borderRadius: '8px',
		border: "none",
		backgroundColor: '#252728',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

const ModalDelete = ({ contact }) => {

	const isActive = useSelector(selectModalDelete);

	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(deleteContact(contact.id));
		dispatch(toggleModalDelete({ isActive: false, contactId: null }));
	}

	useEffect(() => {
		document.body.classList.add("lock");
		return () => {
			document.body.classList.remove("lock");
		};
	}, []);

	return (
		<Modal
			isOpen={isActive}
			onRequestClose={() => dispatch(toggleModalDelete({ isActive: false, contactId: null }))}
			shouldCloseOnOverlayClick={true}
			shouldCloseOnEsc={true}
			style={customStyles}
		>
			<div className={s.modalWrap}>
				<h3 className={s.title}><MdOutlineDelete className={s.icon} /><span>Do you confirm deleting the contact?</span></h3>
				<p className={s.contactName}>{contact.name}</p>
				<button className={s.btn} type="button" onClick={handleClick}><IoMdCheckmarkCircleOutline /><span>Confirm</span></button>
				<button
					className={s.btnClose}
					type="button"
					onClick={() => dispatch(toggleModalDelete({ isActive: false, contactId: null }))}>
					<IoCloseOutline />
				</button>
			</div>
		</Modal>
	);
}

export default ModalDelete

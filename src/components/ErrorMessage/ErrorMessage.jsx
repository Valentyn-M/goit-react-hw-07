import { useDispatch, useSelector } from "react-redux";
import s from "./ErrorMessage.module.css"
import { selectError } from "../../redux/selectors";
import Modal from 'react-modal';
import { IoCloseOutline } from "react-icons/io5";
import { clearError } from "../../redux/contactsSlice";
import { BiSolidErrorAlt } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useEffect } from "react";

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

const ErrorMessage = () => {

	const error = useSelector(selectError);
	const dispatch = useDispatch();

	const handleClose = () => {
		// Скидаємо помилку в contactsSlice
		dispatch(clearError());
	};

	useEffect(() => {
		document.body.classList.add("lock");
		return () => {
			document.body.classList.remove("lock");
		};
	}, []);

	return (
		<Modal
			isOpen={true}
			onRequestClose={handleClose}
			shouldCloseOnOverlayClick={true}
			shouldCloseOnEsc={true}
			style={customStyles}
		>
			<div className={s.modalWrap}>
				<h3 className={s.title}><BiSolidErrorAlt className={s.icon} /><span>Something went wrong</span></h3>
				<div className={s.content}>
					<p>Error: {error}.</p>
					<p>Please refresh the page and try again.</p>
				</div>
				<button className={s.btn} type="button" onClick={handleClose}><IoMdCheckmarkCircleOutline /><span>Ok</span></button>
				<button
					className={s.btnClose}
					type="button"
					onClick={handleClose}
				>
					<IoCloseOutline />
				</button>
			</div>
		</Modal>
	)
}

export default ErrorMessage

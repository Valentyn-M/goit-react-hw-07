import Modal from 'react-modal';
import s from './ModalNumber.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalNumber, toggleModalName, toggleModalNumber } from '../../redux/modalsSlice';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FaPhone } from 'react-icons/fa6';
import { editContactNumber } from '../../redux/contactsSlice';
import * as Yup from "yup";
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';

const customStyles = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
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

const ModalNumber = ({ contact }) => {

	const isActive = useSelector(selectModalNumber);

	const dispatch = useDispatch();

	const initialValues = {
		number: contact?.number || ""
	}

	const handleSubmit = (values, actions) => {
		dispatch(editContactNumber({ id: contact.id, newNumber: values.number }));
		actions.resetForm();
		dispatch(toggleModalNumber({ isActive: false, contactId: null })); // Закриваємо модальне вікно та скидаємо ID
	}

	const contactSchema = Yup.object().shape({
		number: Yup.string().matches(/^[0-9\s-().+]*$/, "Only numbers and allowed symbols are permitted").min(3, "Too Short!").max(50, "Too Long!").required("Required"),
	});

	return (
		<Modal
			isOpen={isActive}
			onRequestClose={() => dispatch(toggleModalNumber({ isActive: false, contactId: null }))}
			shouldCloseOnOverlayClick={true}
			shouldCloseOnEsc={true}
			style={customStyles}
		>
			<div className={s.modalWrap}>
				<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={contactSchema}>
					<Form className={s.form}>
						<h3 className={s.title}><FaPhone className={s.icon} /><span>Edit contact number</span></h3>
						<label className={s.label}>
							<Field className={s.field} type="text" name="number" autoComplete="off" />
							<ErrorMessage className={s.error} name="number" component="span" />
						</label>
						<button className={s.btn} type="submit"><IoMdCheckmarkCircleOutline /><span>Ok</span></button>
						<button
							className={s.btnClose}
							type="button"
							onClick={() => dispatch(toggleModalName({ isActive: false, contactId: null }))}>
							<IoCloseOutline />
						</button>
					</Form>
				</Formik>
			</div>
		</Modal>
	);
}

export default ModalNumber

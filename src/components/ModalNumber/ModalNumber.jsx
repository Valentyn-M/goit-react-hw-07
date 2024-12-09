import Modal from 'react-modal';
import s from './ModalNumber.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModalNumber } from '../../redux/modalsSlice';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
import { editContactNumber } from '../../redux/contactsOps';
import { selectModalNumber } from '../../redux/selectors';
import { useEffect } from 'react';
import { MdOutlinePhone } from 'react-icons/md';

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

const ModalNumber = ({ contact }) => {

	const isActive = useSelector(selectModalNumber);

	const dispatch = useDispatch();

	const initialValues = {
		number: contact?.number || ""
	}

	const handleSubmit = (values, actions) => {
		dispatch(editContactNumber({ contactId: contact.id, newNumber: values.number }));
		actions.resetForm();
		dispatch(toggleModalNumber({ isActive: false, contactId: null })); // Закриваємо модальне вікно та скидаємо ID
	}

	const contactSchema = Yup.object().shape({
		number: Yup.string().matches(/^[0-9\s-().+]*$/, "Only numbers and allowed symbols are permitted").min(3, "Too Short!").max(50, "Too Long!").required("Required"),
	});

	useEffect(() => {
		document.body.classList.add("lock");
		return () => {
			document.body.classList.remove("lock");
		};
	}, []);

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
					{({ errors, touched }) => (
						<Form className={s.form}>
							<h3 className={s.title}><MdOutlinePhone className={s.icon} /><span>Edit contact number</span></h3>
							<label className={s.label} htmlFor="number">
								<div className={`${s.fieldWrap} ${errors.number && touched.number ? s.error : ""}`}>
									<Field className={s.field} type="text" name="number" id="number" placeholder=" " autoComplete="off" />
									<span className={s.floatingLabel}>Number</span>
									<ErrorMessage className={s.floatingError} name="number" component="span" />
								</div>
							</label>
							<button className={s.btn} type="submit"><IoMdCheckmarkCircleOutline /><span>Ok</span></button>
							<button
								className={s.btnClose}
								type="button"
								onClick={() => dispatch(toggleModalNumber({ isActive: false, contactId: null }))}>
								<IoCloseOutline />
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</Modal>
	);
}

export default ModalNumber

import Modal from 'react-modal';
import s from './ModalName.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModalName } from '../../redux/modalsSlice';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
import { editContactName } from '../../redux/contactsOps';
import { selectModalName } from '../../redux/selectors';
import { useEffect } from 'react';
import { MdOutlinePersonOutline } from 'react-icons/md';

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

const ModalName = ({ contact }) => {

	const isActive = useSelector(selectModalName);

	const dispatch = useDispatch();

	const initialValues = {
		name: contact?.name || ""
	}

	const handleSubmit = (values, actions) => {
		dispatch(editContactName({ contactId: contact.id, newName: values.name }));
		actions.resetForm();
		dispatch(toggleModalName({ isActive: false, contactId: null })); // Закриваємо модальне вікно та скидаємо ID
	}

	const contactSchema = Yup.object().shape({
		name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
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
			onRequestClose={() => dispatch(toggleModalName({ isActive: false, contactId: null }))}
			shouldCloseOnOverlayClick={true}
			shouldCloseOnEsc={true}
			style={customStyles}
		>
			<div className={s.modalWrap}>
				<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={contactSchema}>
					{({ errors, touched }) => (
						<Form className={s.form}>
							<h3 className={s.title}><MdOutlinePersonOutline className={s.icon} /><span>Edit contact name</span></h3>
							<label className={s.label} htmlFor="name">
								<div className={`${s.fieldWrap} ${errors.name && touched.name ? s.error : ""}`}>
									<Field className={s.field} type="text" name="name" id="name" placeholder=" " autoComplete="off" />
									<span className={s.floatingLabel}>Name</span>
									<ErrorMessage className={s.floatingError} name="name" component="span" />
								</div>
							</label>
							<button className={s.btn} type="submit"><IoMdCheckmarkCircleOutline /><span>Ok</span></button>
							<button
								className={s.btnClose}
								type="button"
								onClick={() => dispatch(toggleModalName({ isActive: false, contactId: null }))}>
								<IoCloseOutline />
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</Modal>
	);
}

export default ModalName

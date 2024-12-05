import { ErrorMessage, Field, Form, Formik } from "formik"
import s from "./ContactForm.module.css"
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { FaPhone, FaUserLarge } from "react-icons/fa6";
import { MdOutlinePersonAdd } from "react-icons/md";
import { useRef } from "react";

const ContactForm = () => {

	const dispatch = useDispatch();

	const initialValues = {
		name: "",
		number: "",
	}

	const handleSubmit = (values, actions) => {
		const newContact = {
			// Додаємо ідентифікатор в об'єкт нового контакту задопомогою nanoid (вбулований в Redux Toolkit )
			id: nanoid(),
			name: values.name,
			number: values.number,
		}
		dispatch(addContact(newContact));
		actions.resetForm();

		if (buttonRef.current) {
			buttonRef.current.blur();
		}
	}

	const contactSchema = Yup.object().shape({
		name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
		number: Yup.string().matches(/^[0-9\s-().+]*$/, "Only numbers and allowed symbols are permitted").min(3, "Too Short!").max(50, "Too Long!").required("Required"),
	});

	const buttonRef = useRef(null);

	return (
		<div className={s.contactForm}>
			<div className={s.formWrap}>
				<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={contactSchema}>
					<Form className={s.form}>
						<label className={s.label}>
							<div className={s.labelName}><FaUserLarge className={s.icon} /><span>Name</span></div>
							<Field className={s.field} type="text" name="name" autoComplete="off" />
							<ErrorMessage className={s.error} name="name" component="span" />
						</label>
						<label className={s.label}>
							<div className={s.labelName}><FaPhone className={s.icon} /><span>Number</span></div>
							<Field className={s.field} type="text" name="number" autoComplete="off" />
							<ErrorMessage className={s.error} name="number" component="span" />
						</label>
						<button className={s.btn} type="submit" ref={buttonRef}><MdOutlinePersonAdd /><span>Add contact</span></button>
					</Form>
				</Formik>
			</div>
		</div>
	)
}

export default ContactForm

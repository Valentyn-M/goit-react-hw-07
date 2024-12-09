import { ErrorMessage, Field, Form, Formik } from "formik"
import s from "./ContactForm.module.css"
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { MdOutlinePersonAdd, MdOutlinePersonOutline, MdOutlinePhone } from "react-icons/md";
import { useRef } from "react";
import { addContact } from "../../redux/contactsOps";

const ContactForm = () => {

	const dispatch = useDispatch();

	const initialValues = {
		name: "",
		number: "",
	}

	const handleSubmit = (values, actions) => {
		const newContact = {
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
			<h3 className={s.title}>Add new contact</h3>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={contactSchema}>
				{({ errors, touched }) => (
					<Form className={s.form}>
						<label className={s.label} htmlFor="name">
							<div className={`${s.fieldWrap} ${errors.name && touched.name ? s.error : ""}`}>
								<MdOutlinePersonOutline className={s.fieldIcon} />
								<Field className={s.field} type="text" name="name" id="name" placeholder=" " autoComplete="off" />
								<span className={s.floatingLabel}>Name</span>
								<ErrorMessage className={s.floatingError} name="name" component="span" />
							</div>
						</label>
						<label className={s.label} htmlFor="number">
							<div className={`${s.fieldWrap} ${errors.number && touched.number ? s.error : ""}`}>
								<MdOutlinePhone className={s.fieldIcon} />
								<Field className={s.field} type="text" name="number" id="number" placeholder=" " autoComplete="off" />
								<span className={s.floatingLabel}>Number</span>
								<ErrorMessage className={s.floatingError} name="number" component="span" />
							</div>
						</label>
						<button className={s.btn} type="submit" ref={buttonRef}><MdOutlinePersonAdd /><span>Add contact</span></button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default ContactForm

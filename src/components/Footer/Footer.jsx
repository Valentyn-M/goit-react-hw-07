import { FaAddressBook } from "react-icons/fa6";
import s from "./Footer.module.css"

const Footer = () => {

	const currentYear = new Date().getFullYear();

	return (
		<div className={s.copyright}><FaAddressBook className={s.icon} /> Phonebook | React Redux, Redux Toolkit | {currentYear}</div>
	)
}

export default Footer

import { FaAddressBook } from "react-icons/fa6";
import s from "./Footer.module.css"

const Footer = () => {

	const currentYear = new Date().getFullYear();

	return (
		<div className={s.copyright}><FaAddressBook className={s.icon} /> Phonebook | Built with React | {currentYear}</div>
	)
}

export default Footer

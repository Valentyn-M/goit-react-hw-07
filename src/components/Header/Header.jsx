import s from "./Header.module.css"
import { FaAddressBook } from "react-icons/fa6";

const Header = () => {
	return (
		<h1 className={s.title}><FaAddressBook /> Phonebook</h1>
	)
}

export default Header
